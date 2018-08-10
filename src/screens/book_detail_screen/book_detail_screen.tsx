import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import _ from 'lodash'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import {
	// Actions
	ADD_BOOK_USER,
	addBookUser,
	DELETE_BOOK_USER,
	deleteBookUser,
	// Selectors
} from '../../modules/user/user_module'

import {
	// Actions
	fetchUserBooks
} from '../../modules/books/book_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import ViewWrapper from '../../ui/components/view_wrapper'
import { View, Text, Image, Button, ScrollView } from 'react-native'
import Icon from '../../ui/components/icon'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './book_detail_screen_style'
import { Background } from '../../ui/styles/colors'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './book_detail_screen_interfaces'
import { Book } from '../../api/book/book_interfaces'
import routes from '../../router/routes'
import { AsyncAction } from '../../modules/actions_interfaces';
import TextReadMore from '../../ui/components/text_read_more';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class BookDetailScreen extends Component<ownProps, ownState> {
	constructor(props: ownProps) {
		super(props)
		this.state = {
			error: undefined
		}
	}

	componentDidUpdate(prevProps: ownProps) {
		if (prevProps.fetchAddBookUserStatus.isLoading && this.props.fetchAddBookUserStatus.isLoaded) {
			if (this.props.fetchAddBookUserStatus.error) {
				this.setState({ error: this.props.fetchAddBookUserStatus.error })
			} else {
				this.props.handleFetchUserBooks()
				this.props.navigation.navigate('Library')
			}
		}
	}

	render() {
		const { book, handleAddBookUser, handleDeleteBookUser, previousScreen } = this.props
		const { error } = this.state
		const authors = _.join(book.authors, ' and ')

		return (
			<ViewWrapper style={styles.container}>
				<View style={styles.mainView}>
					<View style={styles.backBarContainer}>
						<View style={styles.backBar}>-</View>
					</View>
					{error ? <Text>{error}</Text> : null}
					<View style={styles.bookCover}>
						<View style={styles.bookCoverShadow}>
							<Image style={styles.bookCoverImage} source={{ uri: book.thumbnail }} />
						</View>
					</View>
					<View style={styles.bookTitleAndAuthor}>
						<Text style={styles.boldText}>{book.title}</Text>
						<Text style={styles.text}>by {authors}</Text>
					</View>
					<View style={styles.rating}>
						<Text style={styles.boldText}>Soon</Text>
					</View>
					<View style={styles.scrollViewContainer}>
						<ScrollView style={styles.scrollView}>
							<View style={styles.bookDescription}>
								<TextReadMore
									numberOfLines={4}
								>
									<Text style={styles.text}>
										{book.description}
									</Text>
								</TextReadMore>
							</View>
							<View style={styles.actionButtons}>
								{this.renderLeftActionButton(book, handleAddBookUser, handleDeleteBookUser, previousScreen)}
								<View style={styles.rightActionButton}>
									<Button color="white" title="Buy" onPress={() => 1} />
								</View>
							</View>
						</ScrollView>
					</View>
				</View>
			</ViewWrapper>
		)
	}

	renderLeftActionButton(book: Book, handleAddBookUser: ({ ISBN, thumbnail }: Book) => AsyncAction, handleDeleteBookUser: ({ ISBN }: Book) => AsyncAction, previousScreen: string) {
		let onPress: (book: Book) => AsyncAction, title = ''
		switch (previousScreen) {
			case routes.LIBRARY:
				title = 'Delete from library'
				onPress = handleDeleteBookUser
				break;
			case routes.SEARCH:
				title = 'Add to Library'
				onPress = handleAddBookUser
				break;
		}
		return (
			<View style={styles.leftActionButton}>
				<Button color={Background} title={title} onPress={() => onPress(book)} />
			</View>
		)
	}
}

const mapStateToProps = (state: any, ownProps: ownProps): StateProps => ({
	book: ownProps.navigation.state.params!.book as Book,
	previousScreen: ownProps.navigation.state.params!.previousScreen,
	fetchAddBookUserStatus: getRequestStatus(state, {
		actionType: ADD_BOOK_USER.NAME
	}),
	fetchDeleteBookUserStatus: getRequestStatus(state, {
		actionType: DELETE_BOOK_USER.NAME
	})
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleAddBookUser: ({ ISBN, thumbnail, title }) => dispatch(addBookUser({ ISBN, thumbnail, title } as Book)),
	handleDeleteBookUser: ({ ISBN }) => dispatch(deleteBookUser({ ISBN } as Book)),
	handleFetchUserBooks: () => dispatch(fetchUserBooks())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookDetailScreen)
