
import React from 'react'
import { View } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import routes from '../../routes'

import { Text } from '../../ui/components/text/text_component'
import { Button } from '../../ui/components/button/button_component'

import styles from './onboarding_screens_styles'

export const Welcome: React.SFC<NavigationScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text subTitle semiBold style={styles.textPadding}>
                    Welcome to Book Discover!
                </Text>
                <Text light style={styles.textPadding}>
                    In here you will find an amazing app that will help you keep 
                    track of your readings and also find new interesting books.
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    big
                    onPress={() => navigation.navigate(routes.regionSelect())}
                >
                    Next
                </Button>
            </View>
        </View>
    )
}

export const Enjoy: React.SFC<NavigationScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text subTitle semiBold style={styles.textPadding}>
                    We are all set!
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    big
                    secondary
                    onPress={() => navigation.navigate(routes.regionSelect())}
                >
                    Previous
                </Button>
                <Button
                    big
                    onPress={() => navigation.navigate(routes.app())}
                >
                    Finish
                </Button>
            </View>
        </View>
    )
}

