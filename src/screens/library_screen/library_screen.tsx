import React from 'react'
import { Component } from 'react'
import { LayoutAnimation, TouchableHighlight, Modal } from 'react-native'
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
    getArrayFavouriteUserBooks,
    getArrayHaveReadUserBooks,
    getArrayReadingNowUserBooks,
    getArrayToReadUserBooks
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
import { Background } from '../../ui/styles/colors';

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps, SECTIONS } from './library_screen_interfaces'
import { Book, BOOK_SECTIONS } from '../../api/book/book_interfaces';
import { NavigationEventSubscription } from 'react-navigation';
import routes from '../../router/routes';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const NOT_FOUND = -1
export class LibraryScreen extends Component<ownProps,ownState> {

    listenTransition: NavigationEventSubscription

    constructor(props: ownProps) {
        super(props)
        this.state = {
            openSearchInput: false,
            openSectionSelectionModal: false,
            forceClear: false,
            searchQuery: '',
            fetchingISBN: '',
            currentSection: 'library'
        }
        this.listenTransition = props.navigation.addListener('didFocus', () => { 
            props.handleFetchUserBooks() 
        })
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

    handleReloadView= () => {
        this.setState({ forceClear: true }, () => setTimeout(() => this.setState({ forceClear: false }), 100))
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

    handleToggleSectionSelectionModal = () => {
        this.setState((prevState: ownState) => ({ openSectionSelectionModal: !prevState.openSectionSelectionModal}))
    }

    render() {
        const { populateBookByISBN } = this.props
        const { openSearchInput, openSectionSelectionModal, currentSection } = this.state

        let sections = [] as any
        _.forEach(BOOK_SECTIONS, (title, value) => {
            sections.push({
                title,
                onPress: () => {
                    this.handleReloadView()
                    this.setState({ currentSection: value as 'library' | 'favourites' | 'toRead' | 'readingNow' | 'haveRead', openSectionSelectionModal: false })
                }
            })
        })

        const libraryTopBarIcon = openSectionSelectionModal ? IconNames.CARET_UP : IconNames.CARET_DOWN

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
                        {!openSectionSelectionModal &&
                            <TouchableHighlight 
                                onPress={this.handleToggleSectionSelectionModal}
                            >
                                <View style={styles.libraryDropdown}>
                                    <Text style={styles.title}>{_.toUpper(BOOK_SECTIONS[currentSection])}</Text>
                                    <Icon name={libraryTopBarIcon}/>
                                </View>
                            </TouchableHighlight>
                        }
                    </View>
                    <View style={styles.addIcon}>
                        <Icon 
                            name={IconNames.ADD} 
                            fontSize={20} 
                            onPress={this.handleSearch}
                        />
                    </View>
                </View>
                <Modal
					animationType='fade'
					transparent={true}
					visible={openSectionSelectionModal}
				>
                    <ViewWrapper style={styles.modalContainer}>
                        <View style={styles.topBar}>
                            <View style={styles.topBarTitle}>
                                <TouchableHighlight 
                                    onPress={this.handleToggleSectionSelectionModal}
                                >
                                    <View style={styles.libraryDropdown}>
                                        <Text style={styles.title}>{_.toUpper(BOOK_SECTIONS[currentSection])}</Text>
                                        <Icon name={libraryTopBarIcon}/>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.modal}>
                            <View style={styles.sectionsDropdown}>
                                {_.map(sections, section => <Button {...section} color='white' key={section.title} /> )}
                            </View>
                        </View>
                        <View style={styles.libraryModalLayout} />
                        <View style={styles.topBar} />
                    </ViewWrapper>
				</Modal>
                {openSearchInput ? this.renderInputSearchBar() : this.renderSearchBar() }
                <View style={styles.library}>
                    {this.renderGridView()}
                </View>
                {populateBookByISBN.isLoading && <LoadingOverlay />}
            </ViewWrapper>
        )
    }

    renderGridView() {
        const { 
            arrayUserBooks, 
            fetchUserBooksStatus
        } = this.props
        const { searchQuery, currentSection, forceClear } = this.state
        let sectionFilter: string
        switch (currentSection) {
            case SECTIONS.FAVOURITES:
            case SECTIONS.HAVE_READ:
            case SECTIONS.READING_NOW:
            case SECTIONS.TO_READ:
                sectionFilter = currentSection
                break;
            case SECTIONS.LIBRARY:
            default:
                sectionFilter = 'ISBN'
                break;
        }

        let books = _.isEmpty(arrayUserBooks) || fetchUserBooksStatus.isLoading || forceClear ? 
            [] : _.filter(arrayUserBooks, book => book[sectionFilter])

        books = _.isEmpty(searchQuery) ? 
            books : 
            _.filter(books, (book: Book) => book.title.search(searchQuery) !== NOT_FOUND)

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
