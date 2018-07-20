import React from 'react'
import { string } from 'prop-types'
import { View, Image, Text } from 'react-native'

interface BookItem {
    coverURL: string,
    title: string
}

const BookItem: React.SFC<BookItem> = ({ coverURL, title }) => {
    console.log(coverURL)
    return (
        <View>
            <Image
                style={{width: 75, height: 125}}
                source={{uri: coverURL}}
            />
            <Text>{title}</Text>
        </View>
    )
}

export default BookItem