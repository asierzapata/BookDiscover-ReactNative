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
import { View, Text, Button, ScrollView, Modal, TouchableHighlight } from 'react-native'
import TextReadMore from '../../ui/components/text_read_more'
import CachedImage from '../../ui/components/cached_image'
import LoadingOverlay from '../../ui/components/loading_overlay'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './book_detail_screen_style'
import { Background } from '../../ui/styles/colors'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './book_detail_screen_interfaces'
import { Book, AddBookParams, BOOK_SECTIONS } from '../../api/book/book_interfaces'
import routes from '../../router/routes'
import { AsyncAction } from '../../modules/actions_interfaces'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class BookDetailScreen extends Component<ownProps, ownState> {
	constructor(props: ownProps) {
		super(props)
		this.state = {
			error: undefined,
			showAddBookModal: false,
			showRedirectModal: false
		}
	}

	componentDidUpdate(prevProps: ownProps) {
		if (prevProps.fetchAddBookUserStatus.isLoading && this.props.fetchAddBookUserStatus.isLoaded) {
			if (this.props.fetchAddBookUserStatus.error) {
				this.setState({ error: this.props.fetchAddBookUserStatus.error })
			} else {
				this.handleToggleAddBookModal()
				this.handleToggleRedirectModal()
			}
		}
		if (prevProps.fetchDeleteBookUserStatus.isLoading && this.props.fetchDeleteBookUserStatus.isLoaded) {
			if (this.props.fetchDeleteBookUserStatus.error) {
				this.setState({ error: this.props.fetchDeleteBookUserStatus.error })
			} else {
				this.handleNavigateLibrary()
			}
		}
	}

	handleNavigateLibrary = () => {
		this.props.navigation.navigate('Library')
	}

	handleToggleAddBookModal = () => {
		this.setState((prevState: ownState) => ({ showAddBookModal: !prevState.showAddBookModal}))
	}

	handleToggleRedirectModal = () => {
		this.setState((prevState: ownState) => ({ showRedirectModal: !prevState.showRedirectModal}))
	}

	render() {
		const { book, handleDeleteBookUser, previousScreen } = this.props
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
							<CachedImage 
								style={styles.bookCoverImage} 
								source={book.thumbnail} 
							/>
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
								{this.renderLeftActionButton(book, handleDeleteBookUser, previousScreen)}
								<View style={styles.rightActionButton}>
									<Button color="white" title="Buy" onPress={() => 1} />
								</View>
							</View>
						</ScrollView>
					</View>
					{previousScreen === routes.SEARCH ? this.renderSearchModals() : null}
				</View>
			</ViewWrapper>
		)
	}

	renderSearchModals() {
		const { fetchAddBookUserStatus, handleAddBookUser, book } = this.props
		const { showAddBookModal, showRedirectModal } = this.state

		const { ISBN, thumbnail, title, work_key, edition_key  } = book

		return(
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={showAddBookModal}
				>
					<View style={styles.modal}>
						<View style={styles.modalContent}>
							<Text>Add book to:</Text>
							{_.map(BOOK_SECTIONS, (display, section: 'favourites' | 'toRead' | 'readingNow' | 'haveRead') => 
								<Button title={display} onPress={() => handleAddBookUser({ ISBN, thumbnail, title, section, work_key, edition_key })} key={section}/>
							)}
						</View>
					</View>
					{fetchAddBookUserStatus.isLoading && <LoadingOverlay />}
				</Modal>
				<Modal
					animationType="slide"
					transparent={true}
					visible={showRedirectModal}
				>
					<View style={styles.modal}>
						<View style={styles.modalContent}>
							<Text>Do you want to go to the Library or keep searching?</Text>
							<Button title='Library' onPress={this.handleNavigateLibrary}/>
							<Button title='Keep searching' onPress={() => this.props.navigation.goBack()}/>
						</View>
					</View>
					{fetchAddBookUserStatus.isLoading && <LoadingOverlay />}
				</Modal>
			</View>
		)
	}

	renderLeftActionButton(
		book: Book, 
		handleDeleteBookUser: ({ ISBN }: Book) => AsyncAction, 
		previousScreen: string
	) {

		if (previousScreen === routes.LIBRARY) {
			return(
				<View style={styles.leftActionButton}>
					<Button 
						color={Background} 
						title={'Delete from library'} 
						onPress={() => handleDeleteBookUser(book)} 
					/>
				</View>
			)
		}

		if(previousScreen === routes.SEARCH) {
			return(
				<View style={styles.leftActionButton}>
					<Button 
						color={Background} 
						title={'Add to...'} 
						onPress={this.handleToggleAddBookModal} 
					/>
				</View>
			)
		}
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
	handleAddBookUser: ({ ISBN, thumbnail, title, section, work_key, edition_key }) => dispatch(addBookUser({ ISBN, thumbnail, title, section, work_key, edition_key })),
	handleDeleteBookUser: ({ ISBN }) => dispatch(deleteBookUser({ ISBN } as Book)),
	handleFetchUserBooks: () => dispatch(fetchUserBooks())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookDetailScreen)
