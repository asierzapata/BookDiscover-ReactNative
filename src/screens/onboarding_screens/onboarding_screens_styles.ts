import { StyleSheet } from 'react-native'

import { width } from '../../ui/styles/dimensions'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPadding: {
        paddingVertical: 12,
        paddingHorizontal: width/10,
        textAlign: 'justify',
    },
    textContainer: {
        flex: 8
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})