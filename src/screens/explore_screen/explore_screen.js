import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

export class ExploreScreen extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Explore</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)
