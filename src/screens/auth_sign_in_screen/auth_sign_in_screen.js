import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Text, 
    TextInput, 
    View, 
    Button 
} from 'react-native'
import _ from 'lodash'
import * as firebase from 'firebase'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_sign_in_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthSignInScreen extends Component {
    state = { 
        email: '', 
        password: '', 
        errorMessage: undefined 
    }

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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSignInScreen)
