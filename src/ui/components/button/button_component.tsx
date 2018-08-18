import React, { ReactNode, ReactText } from 'react'
import classnames from '../../../lib/classnames'
import { TouchableOpacity, TouchableHighlight, ActivityIndicator, ViewStyle, StyleProp } from 'react-native'
import { Text } from '../text/text_component'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from './button_component_style'

/* ====================================================== */
/*                       Interfaces                       */
/* ====================================================== */

export interface ButtonProps {
	// Size
	small?: boolean
	big?: boolean
	// Loading
	isLoading?: boolean
	// Styles
	secondary?: boolean
	disabled?: boolean
	style?: StyleProp<ViewStyle>
	onPress: () => void
	children: string | ReactText[]
}

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export const Button: React.SFC<ButtonProps> = ({
	small,
	big,
	secondary,
	onPress,
	disabled,
	children,
	style,
	isLoading
}) => {
	const classes = classnames(styles.baseButton, {
		[styles.small]: small,
		[styles.big]: big,
		[styles.secondary]: secondary
	})
	if (style) classes.push(style)
	return (
		<TouchableOpacity disabled={disabled} style={classes} onPress={onPress}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<Text secondary={secondary} white={!secondary} caps caption={small}>
					{children}
				</Text>
			)}
		</TouchableOpacity>
	)
}
