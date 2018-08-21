import React, { Component } from 'react'
import classnames from '../../../lib/classnames'
import { View, TextInput, ViewStyle, StyleProp, TextInputProps } from 'react-native'
import _ from 'lodash'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './input_component_style'

/* ====================================================== */
/*                       Interfaces                       */
/* ====================================================== */

export interface ownProps extends TextInputProps {
	onChangeText?: (value: string) => void
	style?: StyleProp<ViewStyle>
}

export interface ownState {
	value: string
}

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

class Input extends Component<ownProps, ownState> {
	state = {
		value: ''
	}
	onChangeText = (value: string) => {
		if (_.isFunction(this.props.onChangeText)) this.props.onChangeText(value)
		this.setState({ value })
	}
	render() {
		const { style } = this.props
		const classes = classnames(styles.baseInput, {})
		if (style) classes.push(style)

		return (
			<View style={styles.container}>
				<TextInput style={classes} onChangeText={this.onChangeText} value={this.state.value} {...this.props} />
			</View>
		)
	}
}

export default Input
