import React from 'react'
import { LayoutAnimation } from 'react-native'
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
	getSearchBooks,
	clearSearchBooks
} from '../../modules/books/book_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, TextInput, Button, Text } from 'react-native'
import GridView from '../../ui/components/grid_view'
import ViewWrapper from '../../ui/components/view_wrapper'
import BookItem from '../../ui/components/book_item'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import AdvancedSearchCard from './components/advanced_search_card/advanced_search_card';
import Icon from '../../ui/components/icon';

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './search_screen_style'
import { bookWidth, width } from '../../ui/styles/dimensions'
import IconConstants from '../../ui/styles/icons'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { OwnProps, OwnState, StateProps, DispatchProps } from './search_screen_interfaces'
import { Book, BooksQueryFields, BooksQueryField } from '../../api/book/book_interfaces'
import routes from '../../router/routes';
import { BoldTextColor } from '../../ui/styles/colors';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class SearchScreen extends Component<OwnProps, OwnState> {

	constructor(props: OwnProps) {
		super(props)
		this.state = {
			openAdvancedSearch: false,
			searchQuery: '',
			queryModality: BooksQueryFields.standard,
			lastSearchQuery: '',
			lastQueryModality: BooksQueryFields.standard,
			page: 0,
			activeSlide: 0,
			errorMessage: undefined
		}
	}

	handleCancel = () => {
		const { handleClearSearchBooks, navigation } = this.props
		handleClearSearchBooks()
		navigation.navigate('Library')
	}

	handleSearch = () => {
		const { searchQuery, lastSearchQuery, page, queryModality,lastQueryModality } = this.state

		if (
			lastSearchQuery !== searchQuery ||
			queryModality !== lastQueryModality
		) {
			this.props.handleClearSearchBooks()
		}
		this.setState({ 
			lastSearchQuery: searchQuery, 
			lastQueryModality: queryModality
		})

		this.props.handleFetchBooksByQuery(searchQuery, page, queryModality)

	}

	handleBookDetail = (book: Book) => {
		this.props.navigation.navigate('BookDetail', { book, previousScreen: routes.SEARCH })
	}

	handleEndReached = () => {
		let { page } = this.state
		page += 1
		this.setState({ page }, this.handleSearch)
	}

	handleToggleAdvancedSearch = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		this.setState((currentState: OwnState) => ({openAdvancedSearch: !currentState.openAdvancedSearch}))
    }


	render() {
		return (
			<ViewWrapper style={styles.container}>
				{this.renderSearch()}
				{this.renderAdvancedSearch()}
				<View style={styles.body}>{this.renderGridView()}</View>
			</ViewWrapper>
		)
	}

	renderSearch() {
		return(
			<View style={styles.topBar}>
				<TextInput
					style={styles.textInput}
					autoCapitalize='sentences'
					placeholder='Search'
					placeholderTextColor='white'
					onChangeText={searchQuery => this.setState({ searchQuery })}
					value={this.state.searchQuery}
					blurOnSubmit
					onEndEditing={this.handleSearch}
					onSubmitEditing={this.handleSearch}
				/>
				<Button 
					title='Cancel' 
					color={BoldTextColor} 
					onPress={this.handleCancel} 
				/>
			</View>
		)
	}

	renderAdvancedSearch() {
		const { openAdvancedSearch } = this.state  
		const icon = openAdvancedSearch ? IconConstants.CARET_UP : IconConstants.CARET_DOWN
		const viewStyle = openAdvancedSearch ? styles.advancedSearchOpened : styles.advancedSearch
		return (
			<View style={viewStyle}>
				<View style={styles.advancedSearchCollapseHeader}>
					<Icon name={icon} fontSize={24}/>
					<Button title='Advanced Search' color={BoldTextColor} onPress={this.handleToggleAdvancedSearch} />
				</View>
				{openAdvancedSearch ? this.renderAdvancedSearchFields() : null}
			</View>
			
		)
	}

	renderAdvancedSearchFields() {
		const { activeSlide } = this.state  

		/* Query Filtering: Language, orderBy (relevance, newest)*/
		/* Query Modality: author, title, publisher, subject*/
		const advancedSearchCards = [
			// { 
			// 	title: 'Language', 
			// 	items: {
			// 		'en': 'English',
			// 		'es': 'Spanish',
			// 	},
			// 	value: this.state.queryLanguage,
			// 	onValueChange: (queryLanguage: string) => this.setState({ queryLanguage }, this.handleSearch)
			// },
			// { 
			// 	title: 'Order by', 
			// 	items: {
			// 		...ORDER_BY_FIELDS
			// 	},
			// 	value: this.state.queryOrderBy,
			// 	onValueChange: (queryOrderBy: 'relevance' | 'newest') => this.setState({ queryOrderBy }, this.handleSearch)
			// },
			{ 
				title: 'Specific search', 
				items: [
					{
						key: BooksQueryFields.standard,
						value: '-'
					},
					{
						key: BooksQueryFields.author,
						value: 'Author'
					},
					{
						key: BooksQueryFields.title,
						value: 'Title'
					},
					{
						key: BooksQueryFields.subject,
						value: 'Subject'
					},
					{
						key: BooksQueryFields.isbn,
						value: 'ISBN'
					},
				],
				value: this.state.queryModality,
				onValueChange: (queryModality: BooksQueryField) => this.setState({ queryModality }, this.handleSearch) 
			}
		]

		return(
			<View style={styles.advancedSearchFields}>
				<View style={styles.advancedSearchCarousel}>
					<Carousel 
						layout={'default'} 
						containerCustomStyle={styles.advancedSearchCarousel}
						data={advancedSearchCards}
						layoutCardOffset={18} 
						itemWidth={200}
						sliderWidth={width}
						firstItem={0}
						onSnapToItem={(index: number) => this.setState({ activeSlide: index }) }
						renderItem={({ item, index }: { item: any, index: number }) => <AdvancedSearchCard {...item} key={index}/>}
					/>
				</View>
				<View style={styles.advancedSearchDotsView}>
					<Pagination
						dotsLength={advancedSearchCards.length}
						activeDotIndex={activeSlide}
						containerStyle={styles.advancedSearchDotsContainer}
						dotStyle={styles.advancedSearchDot}
						inactiveDotStyle={styles.advancedSearchDot}
						inactiveDotOpacity={0.4}
						inactiveDotScale={0.6}
					/>
				</View>
			</View>
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

const mapStateToProps = (state: OwnState): StateProps => ({
	fetchBooksByQueryStatus: getRequestStatus(state, {
		actionType: FETCH_BOOKS_SEARCH.NAME
	}),
	searchBooks: getSearchBooks(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleFetchBooksByQuery: (query, page, queryField) => dispatch(fetchBooksSearch(query, page, queryField)),
	handleClearSearchBooks: () => dispatch(clearSearchBooks())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchScreen)