import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation'

/* ====================================================== */
/*                       Routers                          */
/* ====================================================== */

import AppRouter from './router/app_router'
import AuthRouter from './router/auth_router'

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import AuthLoadingScreen from './screens/auth_loading_screen/auth_loading_screen'

/* ====================================================== */
/*                    Components                          */
/* ====================================================== */

import Icon from './ui/components/icon'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const MainRouter = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppRouter,
    Auth: AuthRouter,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default class Router extends Component {
  render() {
    return <MainRouter />
  }
}