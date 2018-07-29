import { createStackNavigator } from 'react-navigation'

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import Library from '../screens/library_screen/library_screen'
import Search from '../screens/search_screen/search_screen'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */


/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default createStackNavigator(
    {
        Library,
        Search
    },
    {
        initialRouteName: 'Library',
        headerMode: 'none',
    }
)