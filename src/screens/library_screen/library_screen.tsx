import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux';

/* ====================================================== */
/*                   Actions / Selectors                  */
/* ====================================================== */

import {
	// Actions
    FETCH_USER_BOOKS,
    fetchUserBooks,
    // Selectors
    debugingSelector
} from '../../modules/user/user_module'

import { getRequestStatus } from '../../modules/api_metadata/api_metadata_module'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, Text, ActivityIndicator } from 'react-native'
import GridView from 'react-native-super-grid';
import Icon from '../../ui/components/icon'
import BookItem from '../../ui/components/book_item'
import ViewWrapper from '../../ui/components/view_wrapper';
import Loading from '../../ui/components/loading'

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

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class LibraryScreen extends Component<ownProps,ownState> {

    componentDidMount() {
        this.props.handleFetchUserBooks()
    }

    componentDidUpdate(prevProps: ownProps) {
        if(prevProps.fetchUserBooksStatus.status === 200){
            
        }
        console.log(this.props.debugingState)
    }

    handleSearch = () => {
        this.props.navigation.navigate('Search')
    }

    render() {
        return (
            <ViewWrapper style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.searchIcon}>
                        <Icon name={IconNames.SEARCH} fontSize={20}/>
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
                <View style={styles.library}>
                    { this.props.fetchUserBooksStatus.isLoading ? 
                        <Loading />
                        : 
                        this.renderGridView()
                    }
                </View>
            </ViewWrapper>
        )
    }

    renderGridView() {
        return (
            <GridView
                itemDimension={bookWidth}
                items={[]}
                renderItem={(item) => <BookItem {...item}/>}
            />
        )
    }

    renderLoading() {
        return (
            <View style={styles.activityIndicator}>
                <ActivityIndicator />
            </View>
        )
    }
}

const mapStateToProps = (state: any): StateProps => ({
    fetchUserBooksStatus: getRequestStatus(state, {
		actionType: FETCH_USER_BOOKS
    }),
    debugingState: debugingSelector(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    handleFetchUserBooks: () => dispatch(fetchUserBooks())
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen)
