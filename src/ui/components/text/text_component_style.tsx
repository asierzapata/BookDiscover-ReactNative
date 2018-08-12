import { StyleSheet } from 'react-native'
import { unit2, unit, unit05, unit025 } from '../../styles/dimensions'
import Color from '../../styles/colors'

export default StyleSheet.create({
	baseText: {
		color: Color.TextColor,
		fontSize: 17
	},
	italic: {
		fontStyle: 'italic'
	},
	light: {
		fontWeight: '100'
	},
	semiBold: {
		fontWeight: '500',
		color: Color.BoldTextColor
	},
	bold: {
		fontWeight: 'bold',
		color: Color.BoldTextColor
	},
	caption: {
		fontSize: 12
	},
	bigCaption: {
		fontSize: 14
	},
	subTitle: {
		fontSize: 20
	},
	title: {
		fontSize: 24
	},
	bigTitle: {
		fontSize: 36
	},
	display: {
		fontSize: 54
	}
})
