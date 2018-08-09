import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import LibraryRouter from './library_router'
import Explore from '../screens/explore_screen/explore_screen'
import Profile from '../screens/profile_screen/profile_screen'
import BookDetail from '../screens/book_detail_screen/book_detail_screen';

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import Icon from "../ui/components/icon";

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import IconNames from "../ui/styles/icons"
import { gestureModalResponseDistance } from "../ui/styles/dimensions"

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const TabBarNavigator = createBottomTabNavigator(
    {
        Library: {
            screen: LibraryRouter,
            navigationOptions: {
                tabBarIcon: ({ tintColor } : { tintColor: string }) => <Icon name={IconNames.LIBRARY} textColor={tintColor} fontSize={20}/>
            }
        },
        Explore: {
            screen: Explore,
            navigationOptions: {
                tabBarIcon: ({ tintColor } : { tintColor: string }) => <Icon name={IconNames.EXPLORE} textColor={tintColor} fontSize={20}/>
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({ tintColor } : { tintColor: string }) => <Icon name={IconNames.PROFILE} textColor={tintColor} fontSize={20}/>
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

export default createStackNavigator(
    {
        TabBarNavigator,
        BookDetail: {
            screen: BookDetail,
            navigationOptions: () => ({
                gestureResponseDistance: {
                    vertical: gestureModalResponseDistance
                }
            })
        }
    },
    {
        initialRouteName: 'TabBarNavigator',
        headerMode: 'none',
        mode: 'modal'
    }
)
