import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

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

export class ProfileScreen extends Component {

    state = { 
        errorMessage: undefined 
    }

    static propTypes = {
    
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
