import { StyleSheet } from 'react-native'
import { width } from '../../../../ui/styles/dimensions'
import { BoldTextColor, PrimaryColorLight } from '../../../../ui/styles/colors';

export default StyleSheet.create({
    advancedSearchRow: {
        flex: 1,
        backgroundColor: BoldTextColor,
        borderRadius: 10
    },
    advancedSearchPicker: {
        maxHeight: 130,
        color: 'white'
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 10
    },
})