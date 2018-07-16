import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, Text, FlatList } from 'react-native'
import Icon from '../../ui/components/icon'
import BookItem from './components/book_item'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './library_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class LibraryScreen extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={styles.searchIcon}>
                        <Icon name="search" fontSize={20}/>
                    </View>
                    <View style={styles.topBarTitle}>
                        <Text style={styles.title}>LIBRARY</Text>
                    </View>
                    <View style={styles.addIcon}>
                        <Icon name="plus" fontSize={20}/>
                    </View>  
                </View>
                <View style={styles.library}>
                    <FlatList 
                        data={[
                            {coverURL: 'https://images-na.ssl-images-amazon.com/images/I/51YN6tjUuML._SX308_BO1,204,203,200_.jpg', title: 'Ilium', key:'item1'},
                            {coverURL: 'https://images-eu.ssl-images-amazon.com/images/I/51j2N5uyuVL.jpg', title: 'Hyperion', key:'item2'},
                            {coverURL: 'https://images-eu.ssl-images-amazon.com/images/I/61SVCHydfQL._SY346_.jpg', title: 'The fall of Hyperion', key:'item3'}
                        ]}
                        renderItem={({ item }) => <BookItem {...item}/>}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen)
