import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import Library from '../screens/library_screen/library_screen'
import Explore from '../screens/explore_screen/explore_screen'
import Profile from '../screens/profile_screen/profile_screen'

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import Icon from '../ui/components/icon'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default createBottomTabNavigator(
    {
        Library: {
            screen: Library,
            navigationOptions: {
                tabBarIcon: () => <Icon name='book' fontSize={20}/>
            }
    },
        Explore: {
            screen: Explore,
            navigationOptions: {
                tabBarIcon: () => <Icon name='compass' fontSize={20}/>
            }
    },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: () => <Icon name='user' fontSize={20}/>
            }
        }
    },
    {
        initialRouteName: 'Library',
        order: [
            'Library',
            'Explore',
            'Profile'
        ],
        backBehavior: 'none',
        tabBarOptions : {
            activeTintColor: '#6E7B8C',
            inactiveTintColor: '#8B95A3',
            showLabel: false,
        }
    }
)