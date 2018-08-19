import React from 'react'
import { Component } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import routes from '../../routes'
import moment from 'moment'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import { fetchUserInfo, FETCH_USER_INFO } from '../../modules/user/user_module'
import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { OwnProps, OwnState, StateProps, DispatchProps } from './auth_loading_screen_interfaces'
import { Dispatch } from 'redux'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_loading_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

class AuthLoadingScreen extends Component<OwnProps,OwnState> {
	constructor(props: OwnProps) {
		super(props)
		this._checkIfUserIsLogged()
	}

	_checkIfUserIsLogged = () => {
		const { currentUser } = firebase.auth()
		if(currentUser) this.props.navigation.navigate(routes.app())
		else {
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					const { creationTime } = user.metadata
					this.props.handleFetchUserInfo()
					this.props.navigation.navigate(isNewlyCreated(creationTime) ? routes.onboarding() : routes.app())
				} else {
					this.props.navigation.navigate(routes.auth())
				}
			})
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
				<StatusBar barStyle='default' />
			</View>
		)
	}
}

const mapStateToProps = (state: OwnState): StateProps => ({})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleFetchUserInfo: () => dispatch(fetchUserInfo())
})

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoadingScreen)

/* ====================================================== */
/*                       Helpers                          */
/* ====================================================== */

const CREATION_SENSIBILITY = 60 * 2
function isNewlyCreated(creationTimeString?: string): boolean {
	if (creationTimeString) {
		const creationTime = moment(creationTimeString)
		const differential = Math.abs(creationTime.diff(moment(), 'seconds'))
		return differential < CREATION_SENSIBILITY
	}
	return false
}
