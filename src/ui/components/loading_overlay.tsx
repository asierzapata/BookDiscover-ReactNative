
import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { SecondaryColor } from '../styles/colors'
import { width, height } from '../styles/dimensions'

const Loading: React.SFC<any> = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator color='white' />
        </View>
    )
}

const overlayWidth = 100
const overlayHeight = 100

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        width: overlayWidth,
        height: overlayHeight,
        left: width - ( width/2 + overlayWidth/2 ),
        //right: 0,
        top: height - ( height/2 + overlayHeight/2 ),
        //bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: SecondaryColor,
        borderRadius: 10,
        opacity: 0.95
    }
})

export default Loading