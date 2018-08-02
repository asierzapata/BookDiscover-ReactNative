import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
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

import { 
    View, 
    TextInput,
    Button
} from 'react-native'
import GridView from 'react-native-super-grid'
import SideSwipe from 'react-native-sideswipe'
import ViewWrapper from '../../ui/components/view_wrapper'
import Loading from '../../ui/components/loading'
import CarouselCard from './components/carousel_card'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles, { contentOffset } from './search_screen_style'
import { searchBookWidth } from '../../ui/styles/dimensions'

/* ====================================================== */
/*                      Interfaces                        */
/* ====================================================== */

import { ownProps, ownState, StateProps, DispatchProps } from './search_screen_interfaces'
import { Book } from '../../api/parsers/books_parser';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class SearchScreen extends Component<ownProps,ownState> {

    constructor(props: ownProps) {
        super(props)
        this.state = {
            searchQuery: '',
            page: 0,
            currentBookIndex: 0,
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
                    <Button 
                        title="Cancel" 
                        onPress={this.handleCancel} 
                    />
                </View>
                <View style={styles.body}>
                    { this.props.fetchBooksByQueryStatus.isLoading ? 
                        <Loading />
                        : 
                        this.renderGridView()
                    }
                </View>
            </ViewWrapper>
        )
    }

    renderGridView() {
        const { searchBooks } = this.props
        if (_.isEmpty(searchBooks)) {
            return null
        }
        return(
            <View>
                {/* <GridView
                    itemDimension={bookWidth}
                    items={searchBooks}
                    renderItem={(item) => <BookItem onPress={() => this.handleBookDetail(item)} {...item}/>}
                /> */}
                <SideSwipe
                index={this.state.currentBookIndex}
                itemWidth={searchBookWidth}
                style={styles.carouselBook}
                data={searchBooks}
                //contentOffset={contentOffset}
                onIndexChange={(index: number) =>
                    this.setState(() => ({ currentBookIndex: index }))
                }
                renderItem={({ item }: { item: Book }) => <CarouselCard onPress={() => this.handleBookDetail(item)} book={item}/>}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
