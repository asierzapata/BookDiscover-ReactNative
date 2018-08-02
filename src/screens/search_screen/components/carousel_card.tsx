import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import _ from 'lodash'

import { Book } from '../../../api/parsers/books_parser';
import BookItem from '../../../ui/components/book_item';

import { BoldTextColor, TextColor } from '../../../ui/styles/colors'
import { width } from '../../../ui/styles/dimensions'

interface CarouselCard {
    book: Book,
    onPress: () => void
}

const CarouselCard: React.SFC<CarouselCard> = ({ book, onPress }) => {
    const authors = _.join(book.authors, ' and ')
    return(
        <View style={styles.card}>
            <BookItem onPress={onPress} {...book} />
            <Text style={styles.boldText}>
                {book.title}
            </Text>
            <Text style={styles.text}>
                by {authors}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 1/5 * width,
        paddingRight: 1/5 * width
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