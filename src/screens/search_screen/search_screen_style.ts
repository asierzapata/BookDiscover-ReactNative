import { StyleSheet } from 'react-native'
import { width } from '../../ui/styles/dimensions'
import { BoldTextColor, PrimaryColorLight } from '../../ui/styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA'
    },
    topBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12
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
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: BoldTextColor,
        color: 'white',
        fontSize: 16
    },
    cancelButton: {
        flex: 1
    },
    carouselBackgroundView : {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    advancedSearch: {
        flex: 1,
    },
    advancedSearchOpened: {
        flex: 3,
    },
    advancedSearchCollapseHeader: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingBottom: 5
    },
    advancedSearchFields: {
        flex: 1,
    },
    advancedSearchRow: {
        flex: 1,
        backgroundColor: BoldTextColor
    },
    advancedSearchPicker: {
        flex: 1,
        height: 50,
        width: 150
    },
    advancedSearchDotsView: {
        flex: 1,
    },
    advancedSearchDotsContainer: {
        //backgroundColor: 'rgba(0, 0, 0, 0.75)',
        height: 40,
        width: width,
        paddingVertical: 0,
    },
    advancedSearchDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: BoldTextColor
    },
    advancedSearchCarousel: {
        flex: 3
    },
})