import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { NavigationScreenProps } from 'react-navigation'
import { Dispatch } from 'redux'

import { ownProps, ownState, StateProps, DispatchProps } from './profile_screen_interfaces'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import { logOut } from '../../modules/user/user_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, Text, Button } from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './profile_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class ProfileScreen extends Component<ownProps, ownState> {
	constructor(props: ownProps) {
		super(props)
		this.state = {
			errorMessage: undefined
		}
	}

	handleLogout = () => {
		this.props.handleLogout()
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Profile</Text>
				<Button title="Log out" onPress={this.handleLogout} />
				{this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
			</View>
		)
	}
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleLogout: () => dispatch(logOut())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileScreen)
