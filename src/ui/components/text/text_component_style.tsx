import { StyleSheet } from 'react-native'
import { unit2, unit, unit05, unit025, FONT_SIZES } from '../../styles/dimensions'
import Color, { PrimaryColor } from '../../styles/colors'

export default StyleSheet.create({
	baseText: {
		color: Color.TextColor,
		fontSize: FONT_SIZES.body
	},
	secondary: {
		color: PrimaryColor
	},
	white: {
		color: 'white'
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
		fontSize: FONT_SIZES.caption
	},
	bigCaption: {
		fontSize: FONT_SIZES.bigCaption
	},
	subTitle: {
		fontSize: FONT_SIZES.subTitle
	},
	title: {
		fontSize: FONT_SIZES.title
	},
	bigTitle: {
		fontSize: FONT_SIZES.bigTitle
	},
	display: {
		fontSize: FONT_SIZES.display
	}
})
