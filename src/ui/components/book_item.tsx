import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { bookHeight, bookWidth } from '../styles/dimensions'

interface BookItem {
    thumbnail: string,
    onPress: () => void
}

const BookItem: React.SFC<BookItem> = ({ thumbnail, onPress }) => {

    if(!onPress) {
        return (
            <View>
                <Image
                    style={styles.book}
                    source={{uri: thumbnail}}
                />
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                style={styles.book}
                source={{uri: thumbnail}}
            />
        </TouchableOpacity>
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