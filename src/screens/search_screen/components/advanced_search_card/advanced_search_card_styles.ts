import { StyleSheet } from 'react-native'
import { width } from '../../../../ui/styles/dimensions'
import { BoldTextColor } from '../../../../ui/styles/colors';

export default StyleSheet.create({
    advancedSearchRow: {
        flex: 1,
        backgroundColor: BoldTextColor
    },
    advancedSearchPicker: {
        maxHeight: 70,
        color: 'white',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 10
    },
})