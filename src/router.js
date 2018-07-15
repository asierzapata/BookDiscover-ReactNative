import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation'

/* ====================================================== */
/*                        Scenes                          */
/* ====================================================== */

import Library from './scenes/library_scene/library_scene'
import Explore from './scenes/explore_scene/explore_scene'
import Profile from './scenes/profile_scene/profile_scene'

/* ====================================================== */
/*                    Components                          */
/* ====================================================== */

import Icon from './ui/components/icon'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const TabBarNavigation = createBottomTabNavigator(
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

export default class Router extends Component {
  render() {
    return <TabBarNavigation />
  }
}