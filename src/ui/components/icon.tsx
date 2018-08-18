import React from 'react'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { TouchableOpacity } from 'react-native'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import { TextColor } from '../styles/colors'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

interface OwnProps {
	fontSize?: number
	textColor?: string
	align?: 'center' | 'left' | 'right'
	name: string
	onPress?: () => void
}

export default class Icon extends React.Component<OwnProps> {
	constructor(props: OwnProps) {
		super(props)
	}

	render() {
		const { fontSize = 12, textColor = TextColor, name = '', onPress, align } = this.props

		if (!onPress) {
			return (
				<FontAwesome
					style={{
						fontSize,
						textAlign: align ? align: 'center',
						color: textColor
					}}
				>
					{Icons[name]}
				</FontAwesome>
			)
		}

		return (
			<TouchableOpacity
				onPress={onPress}
				hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
			>
				<FontAwesome
					style={{
						fontSize,
						textAlign: align ? align: 'center',
						color: textColor,
					}}
				>
					{Icons[name]}
				</FontAwesome>
			</TouchableOpacity>
		)
	}
}
