import { FluidNavigator } from 'react-navigation-fluid-transitions'

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

export default FluidNavigator(
    {
        Welcome,
        RegionSelect,
        Enjoy
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none',
    }
)
