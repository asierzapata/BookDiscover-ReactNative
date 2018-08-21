import { StyleSheet } from 'react-native'
import { unit05, unit025 } from '../../styles/dimensions'
import Color from '../../styles/colors'

const elevation = 5

export default StyleSheet.create({
	container: {
		marginTop: unit025 / 2,
		flexDirection: 'row',
		height: 40,
		width: '90%',
		backgroundColor: Color.White,
		marginLeft: unit05,
		marginRight: unit05,
		shadowOpacity: 0.0015 * elevation + 0.18,
		shadowRadius: 0.54 * elevation,
		shadowOffset: {
			height: 0.6 * elevation,
			width: 2
		},
		borderRadius: 4
	},
	baseInput: {
		color: Color.SecondaryColor,
		fontSize: 17,
		height: 40,
		flex: 1,
		paddingLeft: unit025
	}
})
