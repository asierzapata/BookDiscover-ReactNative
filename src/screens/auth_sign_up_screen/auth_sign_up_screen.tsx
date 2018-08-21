import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { NavigationScreenProps } from 'react-navigation'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { Text, TextInput, KeyboardAvoidingView, Button, ActivityIndicator } from 'react-native'
import Input from '../../ui/components/input/input_component'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import { signUp, SIGN_UP } from '../../modules/user/user_module'
import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './auth_sign_up_screen_interfaces'
import { AuthData } from '../../api/user/user_interfaces'
import { Dispatch } from 'redux'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_sign_up_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthSignUpScreen extends Component<ownProps, ownState> {
	state = {
		email: '',
		password: '',
		errorMessage: undefined
	}

	handleSignUp = () => {
		const { email, password } = this.state

		this.setState({ errorMessage: undefined })

		if (_.isEmpty(email) && _.isEmpty(password)) {
			this.setState({ errorMessage: 'There is an empty field' })
			return
		}

		this.props.handleSignUp({ email, password })
	}

	render() {
		const { signUpStatus } = this.props
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Text>Sign Up</Text>
				{this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
				<Input
					placeholder="Email"
					autoCapitalize="none"
					keyboardType="email-address"
					onChangeText={email => this.setState({ email })}
				/>
				<Input
					secureTextEntry
					placeholder="Password"
					autoCapitalize="none"
					onChangeText={password => this.setState({ password })}
				/>
				{!!signUpStatus.error && <Text style={styles.errorText}>{signUpStatus.error}</Text>}
				{this.props.signUpStatus.isLoading ? (
					<ActivityIndicator />
				) : (
					<Button title="Submit" onPress={this.handleSignUp} />
				)}
			</KeyboardAvoidingView>
		)
	}
}

const mapStateToProps = (state: any, ownProps: ownProps): StateProps => ({
	// Metadata
	signUpStatus: getRequestStatus(state, {
		actionType: SIGN_UP.NAME
	})
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleSignUp: ({ email, password }: AuthData) => dispatch(signUp({ email, password }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthSignUpScreen)
