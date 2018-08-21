import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Text, KeyboardAvoidingView } from 'react-native'
import _ from 'lodash'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import { logIn, LOG_IN } from '../../modules/user/user_module'
import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './auth_log_in_screen_interfaces'
import { AuthData } from '../../api/user/user_interfaces'
import { Dispatch } from 'redux'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import Input from '../../ui/components/input/input_component'
import { Button } from '../../ui/components/button/button_component'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_log_in_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthSignInScreen extends Component<ownProps, ownState> {
	constructor(props: ownProps) {
		super(props)
		this.state = { email: '', password: '', errorMessage: undefined }
	}

	handleSignIn = () => {
		const { email, password } = this.state

		this.setState({ errorMessage: undefined })

		if (_.isEmpty(email) && _.isEmpty(password)) {
			this.setState({ errorMessage: 'There is an empty field' })
			return
		}

		this.props.handlelogIn({ email, password })
	}

	render() {
		const { logInStatus } = this.props
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Text>Sign In</Text>
				{this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
				<Input
					autoCapitalize="none"
					placeholder="Email"
					keyboardType="email-address"
					onChangeText={(email: string) => this.setState({ email })}
				/>
				<Input
					secureTextEntry
					autoCapitalize="none"
					placeholder="Password"
					onChangeText={(password: string) => this.setState({ password })}
				/>
				{!!logInStatus.error && <Text style={styles.errorText}>{logInStatus.error}</Text>}
				<Button
					style={{ marginTop: 10 }}
					disabled={!!logInStatus.isLoading}
					secondary
					onPress={this.handleSignIn}
				>
					Submit
				</Button>
			</KeyboardAvoidingView>
		)
	}
}

const mapStateToProps = (state: any, ownProps: ownProps): StateProps => ({
	// Metadata
	logInStatus: getRequestStatus(state, {
		actionType: LOG_IN.NAME
	})
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handlelogIn: ({ email, password }: AuthData) => dispatch(logIn({ email, password }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthSignInScreen)
