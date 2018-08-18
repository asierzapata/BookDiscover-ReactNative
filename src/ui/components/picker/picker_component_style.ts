import { StyleSheet } from 'react-native'

import { height, width } from '../../styles/dimensions'
import { Background, BoldTextColor, SecondaryColor } from '../../styles/colors'

export default StyleSheet.create({
	modal: {
		backgroundColor: 'rgba(0,0,0,0.65)',
		height: height,
		width: width,
		alignItems: 'center',
		justifyContent: 'center'
	},
	modalTitle: {
		paddingVertical: 12
	},
	modalContent: {
		height: height / 2,
		width: width / 2,
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: Background,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	modalClose: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	modalOptions: {
		flex: 9,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},
	modalOption: {
		alignSelf: 'stretch',
		paddingVertical: 5
	},
	modalOptionsSeparator: {
		width: width / 2.5,
		height: 2,
		borderRadius: 15,
		backgroundColor: BoldTextColor
	},
	optionSelectedText: {
		color: SecondaryColor
	}
})