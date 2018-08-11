import { StyleSheet } from 'react-native'
import { unit2, unit, unit05, unit025 } from '../../styles/dimensions'
import Color from '../../styles/colors'

export default StyleSheet.create({
	baseText: {
		color: Color.TextColor,
		fontSize: 16
	},
	italic: {
		fontStyle: 'italic'
	},
	light: {
		fontWeight: '100'
	},
	bold: {
		fontWeight: 'bold',
		color: Color.BoldTextColor
	},
	caption: {
		fontSize: 14
	},
	subtitle: {
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
