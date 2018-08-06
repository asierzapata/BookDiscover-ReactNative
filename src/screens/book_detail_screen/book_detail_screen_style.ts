import { StyleSheet, Dimensions, Platform } from 'react-native'

import { BoldTextColor, TextColor, Background, SecondaryColor } from '../../ui/styles/colors'
import { bookHeight, bookWidth } from '../../ui/styles/dimensions'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Background
    },
    topBar: {
        flex: 1,
        flexDirection: 'row'
    },
    searchIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topBarTitle: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        backgroundColor: TextColor
    },
    mainView: {
        flex: 1,
        zIndex: 100,
        flexDirection: 'column',
    },
    backBarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBar: {
        width: width * 0.5,
        height: 7,
        borderRadius: 15,
        backgroundColor: BoldTextColor,
    },
    bookCover: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookCoverShadow: {
        ...Platform.select({
            ios: {
                shadowColor: BoldTextColor,
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 5, 
            },
            android: {
                elevation: 5,
            },
        }),
    },
    bookCoverImage: {
        height: bookHeight * 2,
        width: bookWidth * 2,
        borderRadius: 10,
    },
    rating: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    bookTitleAndAuthor: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    },
    bookDescription: {
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    },
    actionButtons: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    leftActionButton: {
        backgroundColor: TextColor,
        borderRadius: 10
    },
    rightActionButton: {
        backgroundColor: SecondaryColor,
        borderRadius: 10
    },
    text: {
        color: TextColor
    },
    boldText: {
        color: BoldTextColor,
        fontWeight: 'bold'
    }
})