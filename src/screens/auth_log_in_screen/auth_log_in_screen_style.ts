import { StyleSheet } from 'react-native'
import { SecondaryColor } from '../../ui/styles/colors'

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textInput: {
		height: 40,
		width: '90%',
		borderColor: 'gray',
		borderWidth: 1,
		marginTop: 8
	},
	errorText: {
		color: SecondaryColor,
		marginTop: 10
	}
})
