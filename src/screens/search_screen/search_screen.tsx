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
    debugingSelector,
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
import GridView from 'react-native-super-grid';
import ViewWrapper from '../../ui/components/view_wrapper';
import Loading from '../../ui/components/loading'
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

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class SearchScreen extends Component<ownProps,ownState> {

    constructor(props: ownProps) {
        super(props)
        this.state = {
            searchQuery: '',
            errorMessage: undefined
        }
    }

    componentDidUpdate(prevProps: ownProps){
        console.log('>>>> componentDidUpdate',this.props.debugingState, this.props.fetchBooksByQueryStatus)
        if(this.props.fetchBooksByQueryStatus.status !== prevProps.fetchBooksByQueryStatus.status) {
            console.log('>>>> ',this.props.debugingState)
        }
    }

    handleCancel = () => {
        this.props.navigation.navigate('Library')
    }

    handleSearch = () => {
        const { searchQuery } = this.state
        this.props.handleFetchBooksByQuery(searchQuery)
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
                <GridView
                    itemDimension={bookWidth}
                    items={searchBooks}
                    renderItem={(item) => <BookItem {...item}/>}
                />
            </View>
        )
    }
}

const mapStateToProps = (state: any): StateProps => ({
    fetchBooksByQueryStatus: getRequestStatus(state, {
		actionType: FETCH_BOOKS_SEARCH
    }),
    debugingState: debugingSelector(state),
    searchBooks: getSearchBooks(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    handleFetchBooksByQuery: (query) => dispatch(fetchBooksSearch(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
