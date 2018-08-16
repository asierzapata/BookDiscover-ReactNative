
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

export const Welcome: React.SFC<NavigationScreenProps> = () => {
    return (
        <View>
            <Text>Welcome to Book Discover!</Text>
            <Text>
                In here you will find an amazing app that will help you keep 
                track of your readings and also find new interesting books
            </Text>
        </View>
    )
}

export const Enjoy: React.SFC<NavigationScreenProps> = () => {
    return (
        <View>
            <Text>We are all set!</Text>
        </View>
    )
}

