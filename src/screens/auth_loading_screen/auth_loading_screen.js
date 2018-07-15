import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import * as firebase from 'firebase'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_loading_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props)
        this._checkIfUserIsLoged()
    }

    _checkIfUserIsLoged = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
