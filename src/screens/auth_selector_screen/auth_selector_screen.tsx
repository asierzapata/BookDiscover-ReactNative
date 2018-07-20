import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Text, 
    View, 
    Button 
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation';

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './auth_selector_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthSelectorScreen extends Component<NavigationScreenProps> {

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

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSelectorScreen)
