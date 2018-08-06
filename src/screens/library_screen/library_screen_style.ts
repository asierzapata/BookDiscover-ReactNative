import { StyleSheet } from 'react-native'

import { TextColor } from '../../ui/styles/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA'
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
    }
})