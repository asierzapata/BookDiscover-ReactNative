import { StyleSheet } from 'react-native'
import { unit2, unit, unit05, unit025, FONT_SIZES } from '../../styles/dimensions'
import { SecondaryColor, TextColor, BoldTextColor } from '../../styles/colors'

export default StyleSheet.create({
	baseText: {
		color: TextColor,
		fontSize: FONT_SIZES.body
	},
	secondary: {
		color: SecondaryColor
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
		color: BoldTextColor
	},
	bold: {
		fontWeight: 'bold',
		color: BoldTextColor
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
