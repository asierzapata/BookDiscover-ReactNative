
import React, { ReactNode } from 'react'
import { View, SafeAreaView, Platform, StyleProp, ViewStyle } from 'react-native'

interface ViewWrapper {
    children: ReactNode,
    style: StyleProp<ViewStyle>
}

const ViewWrapper: React.SFC<ViewWrapper> = ({ children, style }) => {

    if (Platform.OS === 'ios') {
        return (
            <SafeAreaView style={style}>
                {children}
            </SafeAreaView>
        )
    }

    return (
        <View style={style}>
            {children}
        </View>
    )
}

export default ViewWrapper