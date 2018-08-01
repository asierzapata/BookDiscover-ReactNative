import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TextInput, View, Button } from 'react-native'
import _ from 'lodash'
import * as firebase from 'firebase'
import { NavigationScreenProps } from 'react-navigation'
import { Dispatch } from 'redux'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_sign_in_screen_style'
import { AuthData } from '../../api/parsers/user_parser'
import { logInWithPassword } from '../../modules/user/user_module'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './auth_sign_in_screen_interfaces'

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

		this.props.handleLogInWithPassword({ email, password })
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Sign In</Text>
				{this.state.errorMessage && <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>}
				<TextInput
					style={styles.textInput}
					autoCapitalize="none"
					placeholder="Email"
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
				<Button title="Submit" onPress={this.handleSignIn} />
			</View>
		)
	}
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleLogInWithPassword: ({ email, password }: AuthData) => dispatch(logInWithPassword({ email, password }))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthSignInScreen)
