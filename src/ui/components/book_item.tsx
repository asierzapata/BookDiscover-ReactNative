import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { bookHeight, bookWidth } from '../styles/dimensions'
import { BoldTextColor } from '../styles/colors' 
import bookPlaceholder from '../../../assets/images/book-cover-placeholder.png'

interface ownProps {
    thumbnail: string,
    onPress: () => void
}

interface ownState {
    isLoaded: boolean
}

class BookItem extends React.Component<ownProps,ownState> {

    constructor(props: ownProps) {
        super(props)
        this.state = {
            isLoaded: false
        }
    }

    render() {
        const { thumbnail, onPress } = this.props
        if(!onPress) {
            return (
                <View style={styles.bookContainer}>
                    <Image
                        style={styles.book}
                        source={{uri: thumbnail}}
                        onLoad={() => this.setState({ isLoaded: true })}
                    />
                </View>
            )
        }
    
        return (
            <TouchableOpacity style={styles.bookContainer} onPress={onPress}>
                <Image
                    style={styles.book}
                    source={{uri: thumbnail}}
                    onLoad={() => this.setState({ isLoaded: true })}
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