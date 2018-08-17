import { StyleSheet } from 'react-native'
import { unit05 } from '../../ui/styles/dimensions'

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonsContainer: {
		marginTop: unit05,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})
