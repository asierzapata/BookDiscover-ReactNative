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
        borderWidth: 1,
        marginTop: 8
    },
    cancelButton: {
        flex: 1
    }
})