import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { View, Text } from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './explore_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class ExploreScreen extends Component<NavigationScreenProps> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Explore</Text>
            </View>
        )
    }
}

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)
