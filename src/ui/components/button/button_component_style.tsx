import { StyleSheet } from 'react-native'
import { unit, unit2, unit05, unit025 } from '../../styles/dimensions'
import Color from '../../styles/colors'

export default StyleSheet.create({
	baseButton: {
		height: unit05,
		width: unit + unit05,
		paddingTop: unit025 / 2,
		paddingBottom: unit025 / 2,
		paddingLeft: unit025,
		paddingRight: unit025,
		marginRight: unit025,
		marginLeft: unit025,
		borderRadius: 4,
		backgroundColor: Color.PrimaryColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	secondary: {
		backgroundColor: Color.White
	},
	small: {
		width: unit,
		height: (unit05 / 5) * 4
	},
	big: {
		width: unit2 + unit05,
		height: unit05 + unit025
	}
})
