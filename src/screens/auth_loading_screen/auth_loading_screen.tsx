import React from "react"
import { Component } from "react"
import { ActivityIndicator, StatusBar, View } from "react-native"
import * as firebase from "firebase"
import { NavigationScreenProps } from "react-navigation"
import routes from "../../routes"
import moment from 'moment'

/* ====================================================== */
/*                        Style                           */
/* ====================================================== */

import styles from "./auth_loading_screen_style"

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export class AuthLoadingScreen extends Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props)
    this._checkIfUserIsLogged()
  }

  _checkIfUserIsLogged = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        const { creationTime, lastSignInTime } = user.metadata
        //this.props.navigation.navigate(isNewlyCreated(creationTime) ? routes.onboarding() : routes.app())
        this.props.navigation.navigate(true ? routes.onboarding() : routes.app())
      } else {
        this.props.navigation.navigate(routes.auth())
      }
    })
  } 

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

/* ====================================================== */
/*                       Helpers                          */
/* ====================================================== */

const CREATION_SENSIBILITY = 60
function isNewlyCreated(creationTimeString?: string, lastSignInTimeString?: string): boolean {
  if(creationTimeString && lastSignInTimeString) {
    const creationTime = moment(creationTimeString)
    const differential = creationTime.diff(moment(), 'seconds')
    return differential > CREATION_SENSIBILITY || differential < CREATION_SENSIBILITY
  }
  return false
}

export default AuthLoadingScreen
