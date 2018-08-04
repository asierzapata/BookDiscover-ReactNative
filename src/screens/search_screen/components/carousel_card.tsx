import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import _ from 'lodash'

import { Book } from '../../../api/parsers/books_parser';
import BookItem from '../../../ui/components/book_item';

import { BoldTextColor, TextColor } from '../../../ui/styles/colors'
import { searchBookWidth, searchBookHeight } from '../../../ui/styles/dimensions'

interface CarouselCard {
    book: any
    onPress: () => void
}

const CarouselCard: React.SFC<CarouselCard> = ({ book, onPress }) => {
    const bookObject = book.item
    const authors = _.join(bookObject.authors, ' and ')
    return(
        <View style={styles.card}>
            <BookItem onPress={onPress} {...bookObject} carousel={true}/>
            <Text style={styles.boldText}>
                {bookObject.title}
            </Text>
            <Text style={styles.text}>
                by {authors}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        justifyContent: 'center',
        alignItems: 'center',
        width: searchBookWidth,
        height: searchBookHeight
    },
    text: {
        color: TextColor
    },
    boldText: {
        color: BoldTextColor,
        fontWeight: 'bold'
    }
})

export default CarouselCard