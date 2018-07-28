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
        flex: 7
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: TextColor
    },
    activityIndicator : {
        justifyContent: 'center',
        alignItems: 'center',
    }
})