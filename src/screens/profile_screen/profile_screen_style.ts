import { PrimaryColor } from '../../ui/styles/colors'
import { StyleSheet } from 'react-native'
import { unit2, unit, unit05, unit025 } from '../../ui/styles/dimensions'
import Color from '../../ui/styles/colors'

export default StyleSheet.create({
	container: {
		marginTop: unit05,
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: unit025,
		marginRight: unit025
	},
	/* ====================================================== */
	/*           Personal info Section                        */
	/* ====================================================== */
	personalInfoAndFollowersSection: {
		flex: 5,
		alignContent: 'flex-start'
	},
	personalInfo: {
		flex: 3,
		flexDirection: 'row',
		borderColor: 'red'
	},
	personalInfoLeftColumn: {
		flex: 3,
		paddingRight: unit025,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	locationContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	locationIcon: {
		marginBottom: 4
	},
	location: {
		paddingLeft: unit025 / 3
	},

	personalInfoRightColumn: {
		flex: 1
	},
	avatar: {
		height: '100%',
		borderRadius: 10,
		width: '100%'
	},
	followersContainer: {
		flex: 2,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	following: {
		flex: 1
	},
	follower: {
		flex: 1
	},
	followButtonContainer: {
		flex: 2,
		justifyContent: 'center',
		paddingTop: unit025 / 4,
		paddingBottom: unit025 / 4,
		paddingLeft: unit025,
		paddingRight: unit025,
		marginLeft: unit05,
		borderRadius: 4,
		backgroundColor: Color.PrimaryColor,
		alignItems: 'center'
	},
	followButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	/* ====================================================== */
	/*                   Books Section                        */
	/* ====================================================== */
	booksSection: {
		flex: 4,
		width: '100%'
	},
	booksList: {
		flex: 1,
		marginTop: unit025 / 4
	},
	bookItem: {
		marginRight: unit025
	},
	/* ====================================================== */
	/*                   Reviews Section                      */
	/* ====================================================== */
	reviewsSection: {
		flex: 3,
		width: '100%',
		paddingTop: unit05
	},
	reviewList: {
		flex: 1,
		marginTop: unit025 / 4
	},
	reviewItem: {
		width: unit * 4,
		borderRadius: 4,
		paddingTop: unit025 / 2,
		paddingBottom: unit025 / 2,
		paddingRight: unit025,
		paddingLeft: unit025,
		marginRight: unit025,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	descriptionItem: {
		flex: 2,
		marginRight: unit025
	},
	thumbnailItem: {
		height: '100%',
		width: '85%'
	},
	seeFullReviewContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	ratingReviewContainer: {
		width: '100%'
	}
})
