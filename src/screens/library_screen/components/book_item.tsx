import React from 'react'
import { View, Image } from 'react-native'

import styles from '../library_screen_style'

interface BookItem {
    coverURL: string
}

const BookItem: React.SFC<BookItem> = ({ coverURL }) => {
    return (
        <View>
            <Image
                style={styles.book}
                source={{uri: coverURL}}
            />
        </View>
    )
}

export default BookItem