import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import routes from "../routes";

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import LibraryRouter from "./library_router";
import Explore from "../screens/explore_screen/explore_screen";
import Profile from "../screens/profile_screen/profile_screen";

/* ====================================================== */
/*                     Components                         */
/* ====================================================== */

import Icon from "../ui/components/icon";

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import IconNames from "../ui/styles/icons";

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default createBottomTabNavigator(
  {
    Library: {
      screen: LibraryRouter,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon name={IconNames.LIBRARY} textColor={tintColor} fontSize={20} />
        )
      }
    },
    Explore: {
      screen: Explore,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon name={IconNames.EXPLORE} textColor={tintColor} fontSize={20} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon name={IconNames.PROFILE} textColor={tintColor} fontSize={20} />
        )
      }
    }
  },
  {
    initialRouteName: routes.library(),
    order: [routes.library(), routes.explore(), routes.profile()],
    backBehavior: "none",
    tabBarOptions: {
      activeTintColor: "#6E7B8C",
      inactiveTintColor: "#8B95A3",
      showLabel: false
    }
  }
);
