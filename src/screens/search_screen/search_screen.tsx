import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { 
    View
} from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './search_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

interface ownState {
    errorMessage: undefined | string 
}

export class ProfileScreen extends Component<NavigationScreenProps,ownState> {
    render() {
        return (
            <View style={styles.container}>
                
            </View>
        )
    }
}

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
