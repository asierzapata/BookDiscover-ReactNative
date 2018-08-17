import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, Button, KeyboardAvoidingView } from 'react-native'
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
				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Email"
					keyboardType='email-address'
					onChangeText={email => this.setState({ email })}
					value={this.state.email}
				/>
				<TextInput
					secureTextEntry
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Password"
					onChangeText={password => this.setState({ password })}
					value={this.state.password}
				/>
				{!!logInStatus.error && <Text style={styles.errorText}>{logInStatus.error}</Text>}
				<Button disabled={!!logInStatus.isLoading} title="Submit" onPress={this.handleSignIn} />
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
