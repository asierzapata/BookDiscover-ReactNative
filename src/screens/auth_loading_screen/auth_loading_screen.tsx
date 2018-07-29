import React from "react";
import { Component } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import * as firebase from "firebase";
import { NavigationScreenProps } from "react-navigation";
import routes from "../../routes";

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from "./auth_loading_screen_style";

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthLoadingScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this._checkIfUserIsLogged();
  }

  _checkIfUserIsLogged = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? routes.app() : routes.auth());
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
