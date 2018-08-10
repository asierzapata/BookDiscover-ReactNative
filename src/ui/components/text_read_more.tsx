import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BoldTextColor } from '../styles/colors'

export default class TextReadMore extends Component<ownProps, ownState> {

    state = {
        showAllText: false
    }

    _handlePressReadMore = () => {
        this.setState({ showAllText: true })
    }
    
    _handlePressReadLess = () => {
        this.setState({ showAllText: false })
    }

    render() {
        let { showAllText } = this.state;

        let { numberOfLines } = this.props;
    
        return (
            <View>
                <Text
                    numberOfLines={!showAllText ? numberOfLines : 0}
                >
                    {this.props.children}
                </Text>
                {this.renderFooter()}
            </View>
        );
    }

    renderFooter() {
        let { showAllText } = this.state;

        if (!showAllText) {
            if (this.props.renderTruncatedFooter) {
                return this.props.renderTruncatedFooter(this._handlePressReadMore);
            }
        
            return (
                <Text style={styles.button} onPress={this._handlePressReadMore}>
                    Read more
                </Text>
            );
        } 

        if (this.props.renderRevealedFooter) {
            return this.props.renderRevealedFooter(this._handlePressReadLess);
        }
    
        return (
            <Text style={styles.button} onPress={this._handlePressReadLess}>
                Hide
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        color: BoldTextColor,
        marginTop: 5,
        marginBottom: 15,
        fontWeight: 'bold'
    }
});

interface ownState {
    showAllText: boolean
}

interface ownProps {
    numberOfLines: number
    renderTruncatedFooter?: (Function: VoidFunction) => JSX.Element
    renderRevealedFooter?: (Function: VoidFunction) => JSX.Element
    onReady?: () => void
}