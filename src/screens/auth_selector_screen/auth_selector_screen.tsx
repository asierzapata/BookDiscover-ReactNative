import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Button } from '../../ui/components/button/button_component'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_selector_screen_style'
import ViewWrapper from '../../ui/components/view_wrapper'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthSelectorScreen extends Component<NavigationScreenProps> {
	render() {
		return (
			<ViewWrapper style={styles.container}>
				<Text>Select an option</Text>
				<View style={styles.buttonsContainer}>
					<Button secondary onPress={() => this.props.navigation.navigate('AuthSignIn')}>
						Sign in
					</Button>
					<Button onPress={() => this.props.navigation.navigate('AuthSignUp')}>Sign up</Button>
				</View>
			</ViewWrapper>
		)
	}
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthSelectorScreen)
