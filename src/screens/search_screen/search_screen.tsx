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
	FETCH_BOOKS_SEARCH,
	fetchBooksSearch,
	// Selectors
	getSearchBooks
} from '../../modules/books/book_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, TextInput, Button } from 'react-native'
import GridView from '../../ui/components/grid_view'
import ViewWrapper from '../../ui/components/view_wrapper'
import BookItem from '../../ui/components/book_item'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './search_screen_style'
import { bookWidth } from '../../ui/styles/dimensions'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './search_screen_interfaces'
import { Book } from '../../api/book/book_interfaces'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class SearchScreen extends Component<ownProps, ownState> {
	constructor(props: ownProps) {
		super(props)
		this.state = {
			searchQuery: '',
			page: 0,
			errorMessage: undefined
		}
	}

	handleCancel = () => {
		this.props.navigation.navigate('Library')
	}

	handleSearch = () => {
		const { searchQuery, page } = this.state
		this.props.handleFetchBooksByQuery(searchQuery, page)
	}

	handleBookDetail = (book: any) => {
		this.props.navigation.navigate('BookDetail', { book })
	}

	handleEndReached = () => {
		let { page } = this.state
		page += 1
		this.setState({ page }, this.handleSearch)
	}

	render() {
		return (
			<ViewWrapper style={styles.container}>
				<View style={styles.topBar}>
					<TextInput
						style={styles.textInput}
						autoCapitalize="sentences"
						placeholder="Search"
						onChangeText={searchQuery => this.setState({ searchQuery })}
						value={this.state.searchQuery}
						blurOnSubmit
						onEndEditing={this.handleSearch}
						onSubmitEditing={this.handleSearch}
					/>
					<Button title="Cancel" onPress={this.handleCancel} />
				</View>
				<View style={styles.body}>{this.renderGridView()}</View>
			</ViewWrapper>
		)
	}

	renderGridView() {
		const { searchBooks, fetchBooksByQueryStatus } = this.props
		if (_.isEmpty(searchBooks)) {
			return null
		}
		return (
			<View style={styles.carouselBackgroundView}>
				<GridView
					itemDimension={bookWidth}
					items={searchBooks}
					onEndReached={this.handleEndReached}
					isLoading={fetchBooksByQueryStatus.isLoading ? fetchBooksByQueryStatus.isLoading : false}
					renderItem={(item: Book) => <BookItem onPress={() => this.handleBookDetail(item)} {...item} />}
				/>
				{/* <Carousel 
                    layout={'stack'} 
                    data={searchBooks}
                    layoutCardOffset={18} 
                    itemWidth={searchBookWidth}
                    sliderWidth={width}
                    firstItem={0}
                    renderItem={(item: Book) => <CarouselCard onPress={() => this.handleBookDetail(item)} book={item}/>}
                    //renderItem={(item: Book) => <BookItem onPress={() => this.handleBookDetail(item)} {...item}/>}
                /> */}
			</View>
		)
	}
}

const mapStateToProps = (state: any): StateProps => ({
	fetchBooksByQueryStatus: getRequestStatus(state, {
		actionType: FETCH_BOOKS_SEARCH.NAME
	}),
	searchBooks: getSearchBooks(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleFetchBooksByQuery: (query, page) => dispatch(fetchBooksSearch(query, page))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchScreen)
