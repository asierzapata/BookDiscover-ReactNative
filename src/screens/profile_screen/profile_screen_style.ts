import { PrimaryColor } from './../../ui/styles/colors'
import { StyleSheet } from 'react-native'
import { unit2, unit, unit05, unit025 } from '../../ui/styles/dimensions'
import Color from '../../ui/styles/colors'

const AVATAR_HEIGHT = unit + unit05
const AVATAR_WIDTH = unit + unit025

export const style = {
	container: {
		marginTop: unit05 + unit025,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: unit025,
		marginRight: unit025
	}
}

export default StyleSheet.create({
	container: {
		marginTop: unit05 + unit025,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: unit025,
		marginRight: unit025
	},
	personalInfoAndFollowers: {
		width: '100%',
		flex: 1,
		alignContent: 'flex-start'
	},
	personalInfo: {
		flex: 1,
		flexDirection: 'row',
		borderColor: 'red'
	},
	userName: {
		fontSize: 24,
		fontWeight: '600',
		color: Color.BoldTextColor
	},
	description: {
		fontSize: 16,
		color: Color.TextColor
	},
	locationContainer: {
		flex: 2,
		paddingTop: unit05,
		flexDirection: 'row',
		alignItems: 'baseline'
	},
	location: {
		paddingLeft: unit025 / 3,
		fontSize: 16,
		color: Color.TextColor,
		fontStyle: 'italic'
	},
	personalInfoLeftColumn: {
		flex: 3,
		paddingRight: unit025
	},
	personalInfoRightColumn: {
		flex: 1
	},
	avatar: {
		borderRadius: 20,
		height: AVATAR_HEIGHT,
		width: AVATAR_WIDTH
	},
	followersContainer: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'baseline'
	},
	following: {
		flex: 1
	},
	numberOfFollowing: {
		fontSize: 20,
		fontWeight: '500',
		color: Color.BoldTextColor
	},
	textFollowing: {
		fontSize: 12,
		color: Color.TextColor
	},
	follower: {
		flex: 1
	},
	followButtonContainer: {
		justifyContent: 'center',
		height: unit05,
		paddingTop: unit025 / 4,
		paddingBottom: unit025 / 4,
		paddingLeft: unit025,
		paddingRight: unit025,
		borderRadius: 4,
		backgroundColor: Color.PrimaryColor,
		alignItems: 'center'
	},
	followButton: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	}
})
