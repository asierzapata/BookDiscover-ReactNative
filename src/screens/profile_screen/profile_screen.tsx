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

import { View, TouchableOpacity, Image, Button } from 'react-native'
import Icon from '../../ui/components/icon'
import { Text } from '../../ui/components/text/text'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './profile_screen_style'
import IconNames from '../../ui/styles/icons'
import ViewWrapper from '../../ui/components/view_wrapper'

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
			<ViewWrapper style={styles.container}>
				<View style={styles.personalInfoAndFollowers}>
					<View style={styles.personalInfo}>
						<View style={styles.personalInfoLeftColumn}>
							<Text style={styles.userName}>Dan Reynolds</Text>
							<Text style={styles.description}>Focus on product design, never stop learning</Text>
							<View style={styles.locationContainer}>
								<Icon name={IconNames.MAP_MARKER} fontSize={12} />
								<Text style={styles.location}>USA - San Francisco</Text>
							</View>
						</View>
						<View style={styles.personalInfoRightColumn}>
							<Image
								style={styles.avatar}
								source={{
									uri:
										'https://muwhi.ru/public/uploads/content/images/86f766a3d7a148a1fb7e4126da41c357.jpg'
								}}
							/>
						</View>
					</View>
					<View style={styles.followersContainer}>
						<View style={styles.following}>
							<Text style={styles.numberOfFollowing}>26</Text>
							<Text style={styles.textFollowing}>Following</Text>
						</View>
						<View style={styles.following}>
							<Text style={styles.numberOfFollowing}>26</Text>
							<Text style={styles.textFollowing}>Following</Text>
						</View>
						<View style={styles.following}>
							<TouchableOpacity style={styles.followButtonContainer} onPress={() => {}}>
								<Text style={styles.followButton}>Follow</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>

				<Text>Profile</Text>
				<Button title="Log out" onPress={this.handleLogout} />
				{this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
			</ViewWrapper>
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
