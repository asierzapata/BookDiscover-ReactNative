import { FluidNavigator } from 'react-navigation-fluid-transitions'
import { Animated, Easing } from 'react-native'

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import { Welcome, Enjoy } from '../screens/onboarding_screens/onboarding_screens'
import RegionSelect from '../screens/onboarding_screens/region_selection_screen'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const transitionConfig = {
    duration: 1500,
    timing: Animated.timing,
    //easing: Easing.easing
}

export default FluidNavigator(
    {
        Welcome,
        RegionSelect,
        Enjoy
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none',
        transitionConfig,
        navigationOptions: { gesturesEnabled: true },
        mode: 'card' // Horizontal gestures
    }
)
