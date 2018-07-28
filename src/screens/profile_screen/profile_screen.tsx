import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { NavigationScreenProps } from 'react-navigation'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { 
    View, 
    Text,
    Button 
} from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './profile_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

interface ownState {
    errorMessage?: string 
}

export class ProfileScreen extends Component<NavigationScreenProps,ownState> {

    constructor(props: NavigationScreenProps) {
        super(props)
        this.state = {
            errorMessage: undefined
        }
    }

    handleLogout = () => {
        firebase.auth()
            .signOut()
            .then(() => this.props.navigation.navigate('Auth'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
                <Button title="Log out" onPress={this.handleLogout} />
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
            </View>
        )
    }
}

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
