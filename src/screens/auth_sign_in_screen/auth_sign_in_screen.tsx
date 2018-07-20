import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Text, 
    TextInput, 
    View, 
    Button 
} from 'react-native'
import _ from 'lodash'
import * as firebase from 'firebase'
import { NavigationScreenProps } from 'react-navigation';

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_sign_in_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

interface ownState {
    email: string, 
    password: string, 
    errorMessage: undefined | string
}

export class AuthSignInScreen extends Component<NavigationScreenProps,ownState> {

    handleSignIn = () => {
        const { email, password } = this.state

        this.setState({ errorMessage: undefined })

        if(_.isEmpty(email) && _.isEmpty(password)) {
            this.setState({ errorMessage: 'There is an empty field' })
            return
        }

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('App'))
            .catch(error => this.setState({ errorMessage: error.message }))
        // TODO: Firebase
        console.log('>>>> handleSignIn')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign In</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Submit" onPress={this.handleSignIn} />
            </View>
        )
    }
}

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignInScreen)
