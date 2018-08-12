import { StyleSheet } from 'react-native'

import { TextColor, BoldTextColor } from '../../ui/styles/colors'
import { width } from '../../ui/styles/dimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA'
    },
    modalContainer: {
        flex: 1
    },
    topBar: {
        flex: 1,
        flexDirection: 'row'
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    libraryDropdown: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    libraryModalLayout: {
        flex: 6,
    },
    sectionsDropdown: {
        backgroundColor: BoldTextColor,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: width / 3
    },
    library: {
        flex: 8,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: TextColor
    },
    activityIndicator : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        flex: 5,
        borderColor: 'gray',
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20
    },
    cancelButton: {
        flex: 1
    },
    searchQueryTooltip: {
        color: TextColor
    },
    tooltipSearchBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    tooltipButtonSearchBar: {
        backgroundColor: TextColor,
        borderRadius: 10
    },
})