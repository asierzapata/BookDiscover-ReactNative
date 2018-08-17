
import React from 'react'
import { View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import { Text } from '../../ui/components/text/text_component'

import styles from './onboarding_screens_styles'

export const Welcome: React.SFC<NavigationScreenProps> = () => {
    return (
        <View style={styles.container}>
            <Text subTitle semiBold style={styles.textPadding}>
                Welcome to Book Discover!
            </Text>
            <Text light style={styles.textPadding}>
                In here you will find an amazing app that will help you keep 
                track of your readings and also find new interesting books
            </Text>
        </View>
    )
}

export const Enjoy: React.SFC<NavigationScreenProps> = () => {
    return (
        <View style={styles.container}>
            <Text subTitle semiBold style={styles.textPadding}>
                We are all set!
            </Text>
        </View>
    )
}

