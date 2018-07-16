import React from 'react'
import { string } from 'prop-types'
import { View, Image, Text } from 'react-native'


export default BookItem = ({ coverURL, title }) => {
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

BookItem.propTypes = {
    coverURL: string.isRequired,
    title: string
}

