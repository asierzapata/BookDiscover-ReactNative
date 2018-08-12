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

import {
	// Actions
	FETCH_USER_BOOKS,
	fetchUserBooks,
	// Selectors
	getArrayUserBooks
} from '../../modules/books/book_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, TouchableOpacity, Button, FlatList } from 'react-native'
import CachedImage from '../../ui/components/cached_image'
import Icon from '../../ui/components/icon'
import { Text } from '../../ui/components/text/text_component'
import BookItem from '../../ui/components/book_item'

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
		this.state = { errorMessage: undefined }
	}

	handleLogout = () => {
		this.props.handleLogout()
	}

	renderPersonalInfo = () => (
		<View style={styles.personalInfoAndFollowersSection}>
			<View style={styles.personalInfo}>
				<View style={styles.personalInfoLeftColumn}>
					<Text semiBold title>
						Dan Reynolds
					</Text>
					<Text>Focus on product design, never stop learning</Text>
					<View style={styles.locationContainer}>
						<View style={styles.locationIcon}>
							<Icon name={IconNames.MAP_MARKER} fontSize={12} />
						</View>
						<Text italic style={styles.location}>
							USA - San Francisco
						</Text>
					</View>
				</View>
				<View style={styles.personalInfoRightColumn}>
					<CachedImage
						style={styles.avatar}
						source="https://muwhi.ru/public/uploads/content/images/86f766a3d7a148a1fb7e4126da41c357.jpg"
					/>
				</View>
			</View>
			<View style={styles.followersContainer}>
				<View style={styles.following}>
					<Text semiBold>26</Text>
					<Text caption>Followers</Text>
				</View>
				<View style={styles.following}>
					<Text semiBold>26</Text>
					<Text caption>Following</Text>
				</View>
				<View style={styles.followButtonContainer}>
					<TouchableOpacity onPress={() => {}}>
						<Text style={styles.followButtonText}>Follow</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)

	renderBooks = () => (
		<View style={styles.booksSection}>
			<Text bold>All books ({this.props.books.length})</Text>
			<FlatList
				style={styles.booksList}
				horizontal={true}
				data={this.props.books}
				keyExtractor={item => item.ISBN}
				renderItem={({ item }) => (
					<View style={styles.bookItem}>
						<BookItem key={item.ISBN} onPress={() => {}} thumbnail={item.thumbnail}>
							{item}
						</BookItem>
					</View>
				)}
			/>
		</View>
	)

	renderReviews = () => (
		<View style={styles.reviewsSection}>
			<Text bold>All reviews ({this.props.books.length})</Text>
			<FlatList
				style={styles.reviewList}
				horizontal={true}
				data={this.props.books}
				keyExtractor={item => item.ISBN}
				renderItem={({ item }) => (
					<View style={styles.reviewItem}>
						<View style={styles.descriptionItem}>
							<Text bigCaption bold>
								This book is fantastic. It has the misfortune of...
							</Text>
							<View style={styles.seeFullReviewContainer}>
								<Text caption>See full review </Text>
								<Icon name={IconNames.CARET_RIGHT} />
							</View>
							<View style={styles.ratingReviewContainer}>
								<Icon name={IconNames.STAR_FULL} />
							</View>
						</View>
						<CachedImage style={styles.thumbnailItem} source={item.thumbnail} />
					</View>
				)}
			/>
		</View>
	)

	render() {
		return (
			<ViewWrapper style={styles.container}>
				{this.renderPersonalInfo()}
				{this.renderBooks()}
				{this.renderReviews()}
				<Button title="Log out" onPress={this.handleLogout} />
			</ViewWrapper>
		)
	}
}

const mapStateToProps = (state: any): StateProps => ({
	books: getArrayUserBooks(state),
	fetchUserBooksStatus: getRequestStatus(state, {
		actionType: FETCH_USER_BOOKS.NAME
	})
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleLogout: () => dispatch(logOut()),
	handleFetchUserBooks: () => dispatch(fetchUserBooks())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileScreen)
