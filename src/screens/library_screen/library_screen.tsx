import React from 'react'
import { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import _ from 'lodash'

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import {
	// Actions
    FETCH_USER_BOOKS,
    fetchUserBooks,
    POPULATE_BOOK_BY_ISBN,
    populateBookByISBN,
    // Selectors
    getUserBooks,
    getArrayUserBooks,
} from '../../modules/books/book_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, Text, TextInput, Button } from 'react-native'
import GridView from '../../ui/components/grid_view'
import Icon from '../../ui/components/icon'
import BookItem from '../../ui/components/book_item'
import ViewWrapper from '../../ui/components/view_wrapper'
import LoadingOverlay from '../../ui/components/loading_overlay'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './library_screen_style'
import IconNames from '../../ui/styles/icons'
import { bookWidth } from '../../ui/styles/dimensions'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './library_screen_interfaces'
import { Book } from '../../api/book/book_interfaces';
import routes from '../../router/routes';
import { Background } from '../../ui/styles/colors';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const NOT_FOUND = -1
export class LibraryScreen extends Component<ownProps,ownState> {

    constructor(props: ownProps) {
        super(props)
        this.state = {
            openSearchInput: false,
            searchQuery: ''
        }
    }   

    componentDidMount() {
        this.setState({ fetchingISBN: '' })
        this.props.handleFetchUserBooks()
    }

    componentDidUpdate(prevProps: ownProps) {
        const { fetchingISBN } = this.state
        if (prevProps.populateBookByISBN.isLoading && this.props.populateBookByISBN.isLoaded) {
            this.navigateToBookDetail(this.props.userBooks[fetchingISBN!])
        }
    }

    navigateToBookDetail = (book: Book) => {
        this.props.navigation.navigate('BookDetail', { 
            book,
            previousScreen: routes.LIBRARY 
        })
    }

    handleSearch = () => {
        this.props.navigation.navigate('Search')
    }

    handleToggleLibrarySearch = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState((currentState) => ({openSearchInput: !currentState.openSearchInput}))
    }

    handleClear = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({ searchQuery: '' })
    }

    handleBookDetail = (book: Book) => {
        const ISBN = book.ISBN
        const userBook = this.props.userBooks[ISBN]
        if(userBook.description) {
            this.navigateToBookDetail(userBook)
        } else {
            this.setState({ fetchingISBN: ISBN })
            this.props.handlePopulateBookByISBN(ISBN)
        }
    }

    render() {
        const { populateBookByISBN } = this.props
        const { openSearchInput } = this.state
        return (
            <ViewWrapper style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.searchIcon}>
                        <Icon 
                            name={IconNames.SEARCH} 
                            fontSize={20}
                            onPress={this.handleToggleLibrarySearch}
                        />
                    </View>
                    <View style={styles.topBarTitle}>
                        <Text style={styles.title}>LIBRARY</Text>
                    </View>
                    <View style={styles.addIcon}>
                        <Icon 
                            name={IconNames.ADD} 
                            fontSize={20} 
                            onPress={this.handleSearch}
                        />
                    </View>
                </View>
                { openSearchInput ? this.renderInputSearchBar() : this.renderSearchBar() }
                <View style={styles.library}>
                    {this.renderGridView()}
                </View>
                {populateBookByISBN.isLoading && <LoadingOverlay />}
            </ViewWrapper>
        )
    }

    renderGridView() {
        const { arrayUserBooks, fetchUserBooksStatus } = this.props
        const { searchQuery } = this.state
        let books = _.isEmpty(arrayUserBooks) ? [] : arrayUserBooks
        books = _.isEmpty(searchQuery) ? 
            books : 
            _.filter(books, (book) => book.title.search(searchQuery) !== NOT_FOUND)
        
        return (
            <GridView
                itemDimension={bookWidth}
                items={books}
                isLoading={fetchUserBooksStatus.isLoading ? fetchUserBooksStatus.isLoading : false}
                renderItem={(item: Book) => <BookItem onPress={() => this.handleBookDetail(item)} {...item}/>}
            />
        )
    }

    renderSearchBar() {
        if(_.isEmpty(this.state.searchQuery)) return null
        return (
            <View style={styles.tooltipSearchBar}>
                <Text style={styles.searchQueryTooltip} onPress={this.handleToggleLibrarySearch}>
                    {this.state.searchQuery}
                </Text>
                <View style={styles.tooltipButtonSearchBar}>
                    <Button 
                        title="Clear" 
                        color={Background}
                        onPress={this.handleClear} 
                    />
                </View>
            </View>
        )
    }

    renderInputSearchBar() {
        return (
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="sentences"
                    placeholder="Search"
                    onChangeText={searchQuery => this.setState({ searchQuery })}
                    value={this.state.searchQuery}
                    blurOnSubmit
                    onEndEditing={this.handleToggleLibrarySearch}
                    onSubmitEditing={this.handleToggleLibrarySearch}
                />
            </View>
        )
    }
}

const mapStateToProps = (state: any): StateProps => ({
    userBooks: getUserBooks(state),
    arrayUserBooks: getArrayUserBooks(state),
    fetchUserBooksStatus: getRequestStatus(state, {
		actionType: FETCH_USER_BOOKS.NAME
    }),
    populateBookByISBN: getRequestStatus(state, {
		actionType: POPULATE_BOOK_BY_ISBN.NAME
    })
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    handleFetchUserBooks: () => dispatch(fetchUserBooks()),
    handlePopulateBookByISBN: (ISBN: string) => dispatch(populateBookByISBN(ISBN))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen)
