import React from "react";
import { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import routes from "./routes";

/* ====================================================== */
/*                       Routers                          */
/* ====================================================== */

import AppRouter from "./router/app_router";
import AuthRouter from "./router/auth_router";
import OnboardingRouter from './router/onboarding_router'

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import AuthLoadingScreen from "./screens/auth_loading_screen/auth_loading_screen";

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

const MainRouter = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Onboarding: OnboardingRouter,
    App: AppRouter,
    Auth: AuthRouter
  },
  {
    initialRouteName: routes.authLoading()
  }
);

export default class Router extends Component {
  render() {
    return <MainRouter />;
  }
}
