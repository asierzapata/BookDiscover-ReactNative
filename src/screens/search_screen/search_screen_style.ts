import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA'
    },
    topBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 6
    },
    textInput: {
        height: 40,
        flex: 5,
        borderColor: 'gray',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
    },
    cancelButton: {
        flex: 1
    },
    carouselBackgroundView : {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
})