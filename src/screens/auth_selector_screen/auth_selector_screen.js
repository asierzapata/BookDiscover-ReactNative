import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    Text, 
    TextInput, 
    View, 
    Button 
} from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_selector_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthSelectorScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Select an option</Text>
                <Button 
                    title="Sign In"
                    onPress={() => this.props.navigation.navigate('AuthSignIn')}
                />
                <Button 
                    title="Sign Up"
                    onPress={() => this.props.navigation.navigate('AuthSignUp')}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSelectorScreen)
