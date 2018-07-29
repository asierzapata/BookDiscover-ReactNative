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
    // Selectors
} from '../../modules/user/user_module'


/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import ViewWrapper from '../../ui/components/view_wrapper'
import { View, Text, Image, Button } from 'react-native'
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
import { Book } from '../../api/parsers/books_parser';

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class BookDetailScreen extends Component<ownProps,ownState> {

    render() {
        const book = this.props.navigation.state.params!.book as Book
        const authors = _.join(book.authors, ' and ')

        console.log('>>>>>> state navigation ', this.props.navigation.state)
        return(
            <ViewWrapper style={styles.container}>
                {/* <View style={styles.topBar}>
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
                        />
                    </View>
                </View> */}
                <View style={styles.mainView}>
                    <View style={styles.backBarContainer}>
                        <View style={styles.backBar}>-</View>
                    </View>
                    <View style={styles.bookCover}>
                        <View style={styles.bookCoverShadow}>
                            <Image 
                                style={styles.bookCoverImage}
                                source={{uri: book.thumbnail}}
                            />
                        </View>
                    </View>
                    <View style={styles.bookTitleAndAuthor}>
                        <Text style={styles.boldText}>
                            {book.title}
                        </Text>
                        <Text style={styles.text}>
                            by {authors}
                        </Text>
                    </View>
                    <View style={styles.rating}>
                        <Text style={styles.boldText}>
                            Soon
                        </Text>
                    </View>
                    <View style={styles.bookDescription}>
                        <Text numberOfLines={4} ellipsizeMode='tail' style={styles.text}>
                            {book.description}
                        </Text>
                    </View>
                    <View style={styles.actionButtons}>
                        <View style={styles.leftActionButton}>
                            <Button 
                                color={Background}
                                title='Add to library'
                                onPress={()=> 1}
                            />
                        </View>
                        <View style={styles.rightActionButton}>
                            <Button 
                                color='white'
                                title='Buy'
                                onPress={()=> 1}
                            />
                        </View>
                    </View>
                </View>
            </ViewWrapper>
        )
    }
}


const mapStateToProps = (state: any): StateProps => ({
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailScreen)
