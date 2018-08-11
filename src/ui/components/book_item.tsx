import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Platform, LayoutAnimation } from 'react-native'
import { bookHeight, bookWidth } from '../styles/dimensions'
import { BoldTextColor, TextColor } from '../styles/colors' 

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

    handleOnLoad = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({ isLoaded: true })
    }

    render() {
        const { thumbnail, onPress } = this.props
        const { isLoaded } = this.state

        const imageStyle = isLoaded ? styles.book : styles.bookCoverNotLoaded

        if(!onPress) {
            return (
                <View style={styles.bookContainer}>
                    <Image
                        style={imageStyle}
                        source={{uri: thumbnail}}
                        onLoad={this.handleOnLoad}
                    />
                    {!isLoaded &&
                        <View style={styles.bookPlaceholder} />
                    }
                </View>
            )
        }
    
        return (
            <TouchableOpacity style={styles.bookContainer} onPress={onPress}>
                <Image
                    style={imageStyle}
                    source={{uri: thumbnail}}
                    onLoad={this.handleOnLoad}
                />
                {!isLoaded &&
                    <View style={styles.bookPlaceholder} />
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    bookCoverNotLoaded: {
        height: 1,
        width: 1,
    },
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