import { StyleSheet } from 'react-native'

import { width } from '../../ui/styles/dimensions'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    textPadding: {
        paddingVertical: 12,
        paddingHorizontal: width/10,
        textAlign: 'justify',
    },
    textContainer: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})