import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import * as firebase from 'firebase'
import { NavigationScreenProps } from 'react-navigation';

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_loading_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthLoadingScreen extends Component<NavigationScreenProps> {
    constructor(props: NavigationScreenProps) {
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

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
