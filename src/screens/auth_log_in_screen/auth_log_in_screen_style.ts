import { StyleSheet } from 'react-native'
import { SecondaryColor } from '../../ui/styles/colors'

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	errorText: {
		color: SecondaryColor,
		marginTop: 10
	}
})
