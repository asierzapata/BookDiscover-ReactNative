import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { bookHeight, bookWidth } from '../styles/dimensions'
import { BoldTextColor } from '../styles/colors' 

interface BookItem {
    thumbnail: string,
    onPress: () => void
}

const BookItem: React.SFC<BookItem> = ({ thumbnail, onPress }) => {

    if(!onPress) {
        return (
            <View style={styles.bookContainer}>
                <Image
                    style={styles.book}
                    source={{uri: thumbnail}}
                />
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles.bookContainer} onPress={onPress}>
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
        alignItems: 'center',
        borderRadius: 10,
    },
    bookContainer: {
        ...Platform.select({
            ios: {
                shadowColor: BoldTextColor,
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 5, 
            },
            android: {
                elevation: 5,
            },
        }),
        alignItems: 'center',
    }
})

export default BookItem