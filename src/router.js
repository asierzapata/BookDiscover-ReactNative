import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'

/* ====================================================== */
/*                        Scenes                          */
/* ====================================================== */

//import HomeScreen from './scenes/home_scene/home_scene'
//import Debugger from './scenes/debugger_scene/debugger_scene'
import Landing from './scenes/landing_scene/landing_scene'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const RootStack = createStackNavigator(
  {
    Landing: Landing
  },
  {
    initialRouteName: 'Landing',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class Router extends Component {
  render() {
    return <RootStack />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});