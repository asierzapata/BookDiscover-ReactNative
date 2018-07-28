import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { bookHeight, bookWidth } from '../styles/dimensions'

interface BookItem {
    thumbnail: string
}

const BookItem: React.SFC<BookItem> = ({ thumbnail }) => {
    return (
        <View>
            <Image
                style={styles.book}
                source={{uri: thumbnail}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    book: {
        height: bookHeight,
        width: bookWidth,
        alignItems: 'center'
    },
})

export default BookItem