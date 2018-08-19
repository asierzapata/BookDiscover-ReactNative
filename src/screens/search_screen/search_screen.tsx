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

import { getUserSearchEngine } from '../../modules/user/user_module'

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

import { OwnProps, OwnState, StateProps, DispatchProps, Card } from './search_screen_interfaces'
import { Book, BooksQueryFields, BooksQueryField, BooksQueryLanguages, BooksQueryOrderBys, BooksQueryLanguage, BooksQueryOrderBy, BooksQueryOptions } from '../../api/book/book_interfaces'
import routes from '../../router/routes';
import { BoldTextColor } from '../../ui/styles/colors';
import { SearchEngines } from '../../api/user/user_interfaces';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class SearchScreen extends Component<OwnProps, OwnState> {

	advancedSearchCards: Card[] = []

	constructor(props: OwnProps) {
		super(props)
		this.state = {
			openAdvancedSearch: false,
			searchQuery: '',
			lastSearchQuery: '',
			page: 0,
			activeSlide: 0,
			errorMessage: undefined,
			queryParams: { queryModality: BooksQueryFields.standard },
			lastQueryParams: { queryModality: BooksQueryFields.standard }
		}
	}

	componentDidMount() {
		this.searchEngineState()
	}

	searchEngineState = () => {
		this.advancedSearchCards.push(
			{ 
				title: 'Specific search', 
				items: [
					{ key: BooksQueryFields.standard, value: 'Standard' },
					{ key: BooksQueryFields.author, value: 'Author' },
					{ key: BooksQueryFields.title, value: 'Title' },
					{ key: BooksQueryFields.subject, value: 'Subject' },
					{ key: BooksQueryFields.isbn, value: 'ISBN' },
				],
				value: _.capitalize(this.state.queryParams.queryModality),
				onValueChange: ({ key }: { key: BooksQueryField }) => 
					this.setState((currentState: OwnState) => ({ queryParams: { ...currentState.queryParams, queryModality: key }}), this.handleSearch)
			}
		)
		switch(this.props.userSearchEngine) {
			case(SearchEngines.GoogleBooks):
				this.setState({
					queryParams: { 
						queryModality: BooksQueryFields.standard,
						queryOrderBy: BooksQueryOrderBys.Relevance,
						queryLanguage: BooksQueryLanguages.English,
					},
					lastQueryParams: { 
						queryModality: BooksQueryFields.standard,
						queryOrderBy: BooksQueryOrderBys.Relevance,
						queryLanguage: BooksQueryLanguages.English,
					}
				}, () => {
					this.advancedSearchCards.push(
						{
							title: 'Language',
							items: [
								{ key: BooksQueryLanguages.English, value: 'English' },
								{ key: BooksQueryLanguages.Spanish, value: 'Spanish' }
							],
							value: this.state.queryParams.queryLanguage!,
							onValueChange: ({ key }: { key: BooksQueryLanguage }) => 
								this.setState((currentState: OwnState) => ({ queryParams: { ...currentState.queryParams, queryLanguage: key }}), this.handleSearch)
						},
						{
							title: 'Order By',
							items: [
								{ key: BooksQueryOrderBys.Relevance, value: 'Relevance' },
								{ key: BooksQueryOrderBys.Newest, value: 'Newest' }
							],
							value: this.state.queryParams.queryOrderBy!,
							onValueChange: ({ key }: { key: BooksQueryOrderBy }) => 
								this.setState((currentState: OwnState) => ({ queryParams: { ...currentState.queryParams, queryOrderBy: key }}), this.handleSearch)
						}
					)
				})
				break;
			case(SearchEngines.OpenLibrary):
			default:
				break;
		}
	}

	handleCancel = () => {
		const { handleClearSearchBooks, navigation } = this.props
		handleClearSearchBooks()
		navigation.navigate('Library')
	}

	handleSearch = () => {
		const { searchQuery, lastSearchQuery, page, queryParams, lastQueryParams } = this.state
		const { userSearchEngine } = this.props

		if (
			lastSearchQuery !== searchQuery ||
			!_.isEqual(queryParams, lastQueryParams)
		) {
			this.setState({ page: 0 })
			this.props.handleClearSearchBooks()
		}
		this.setState({ 
			lastSearchQuery: searchQuery, 
			lastQueryParams: queryParams
		})

		this.props.handleFetchBooksByQuery(searchQuery, page, userSearchEngine, queryParams.queryModality as BooksQueryField, 
			{ queryLanguage: queryParams.queryLanguage, queryOrderBy: queryParams.queryOrderBy } as BooksQueryOptions)

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

		console.log(this.advancedSearchCards)

		return(
			<View style={styles.advancedSearchFields}>
				<View style={styles.advancedSearchCarousel}>
					<Carousel 
						layout={'default'} 
						containerCustomStyle={styles.advancedSearchCarousel}
						data={this.advancedSearchCards}
						layoutCardOffset={18} 
						itemWidth={200}
						sliderWidth={width}
						firstItem={0}
						onSnapToItem={(index: number) => this.setState({ activeSlide: index }) }
						renderItem={({ item }: { item: any }) => <AdvancedSearchCard {...item}/>}
					/>
				</View>
				<View style={styles.advancedSearchDotsView}>
					<Pagination
						dotsLength={this.advancedSearchCards.length}
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
	searchBooks: getSearchBooks(state),
	userSearchEngine: getUserSearchEngine(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
	handleFetchBooksByQuery: (query, page, engine, queryField, queryOptions) => dispatch(fetchBooksSearch(query, page, engine, queryField, queryOptions)),
	handleClearSearchBooks: () => dispatch(clearSearchBooks())
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchScreen)