import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, Text } from 'react-native'
import GridView from 'react-native-super-grid';
import Icon from '../../ui/components/icon'
import BookItem from './components/book_item'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './library_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

interface ownState {

}

export class LibraryScreen extends Component<NavigationScreenProps,ownState> {
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
                    <GridView
                        itemDimension={75}
                        items={[
                            {coverURL: 'https://images-na.ssl-images-amazon.com/images/I/51YN6tjUuML._SX308_BO1,204,203,200_.jpg', title: 'Ilium', key:'item1'},
                            {coverURL: 'https://images-eu.ssl-images-amazon.com/images/I/51j2N5uyuVL.jpg', title: 'Hyperion', key:'item2'},
                            {coverURL: 'https://images-eu.ssl-images-amazon.com/images/I/61SVCHydfQL._SY346_.jpg', title: 'The fall of Hyperion', key:'item3'}
                        ]}
                        renderItem={(item) => <BookItem {...item}/>}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryScreen)
