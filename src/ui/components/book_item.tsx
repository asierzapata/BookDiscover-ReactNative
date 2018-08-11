import React from 'react'
import { View, StyleSheet, TouchableOpacity, Platform, LayoutAnimation } from 'react-native'
import { Image } from 'react-native-expo-image-cache'
import { bookHeight, bookWidth } from '../styles/dimensions'
import { BoldTextColor, TextColor } from '../styles/colors' 
import CachedImage from './cached_image';

interface ownProps {
    thumbnail: string,
    onPress: () => void
}

interface ownState {}

class BookItem extends React.Component<ownProps,ownState> {

    render() {
        const { thumbnail, onPress } = this.props

        if(!onPress) {
            return (
                <View style={styles.bookContainer}>
                    <CachedImage 
                        style={styles.book}
                        placeholderStyle={styles.bookPlaceholder}
                        source={thumbnail}
                    />
                </View>
            )
        }
    
        return (
            <TouchableOpacity style={styles.bookContainer} onPress={onPress}>
                <CachedImage 
                    style={styles.book}
                    placeholderStyle={styles.bookPlaceholder}
                    source={thumbnail}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    book: {
        height: bookHeight,
        width: bookWidth,
        alignItems: 'center',
        borderRadius: 10,
    },
    bookPlaceholder: {
        height: bookHeight,
        width: bookWidth,
        borderRadius: 10,
        backgroundColor: TextColor,
        opacity: 0.65
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