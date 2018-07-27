import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationScreenProps } from 'react-navigation'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import { 
    View, 
    TextInput,
    Button
} from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './search_screen_style'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

interface ownState {
    searchQuery: string,
    errorMessage?: string 
}

export class SearchScreen extends Component<NavigationScreenProps,ownState> {

    constructor(props: NavigationScreenProps) {
        super(props)
        this.state = {
            searchQuery: '',
            errorMessage: undefined
        }
    }

    handleCancel = () => {
        this.props.navigation.navigate('Library')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TextInput 
                        style={styles.textInput}
                        autoCapitalize="sentences"
                        placeholder="Search"
                        onChangeText={searchQuery => this.setState({ searchQuery })}
                        value={this.state.searchQuery}
                    />
                    <Button 
                        title="Cancel" 
                        onPress={this.handleCancel} 
                    />
                </View>
                <View style={styles.body}>
                    This is the search
                </View>
            </View>
        )
    }
}

const mapStateToProps = () => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
