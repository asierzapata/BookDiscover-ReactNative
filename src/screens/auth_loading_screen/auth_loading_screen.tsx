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
        console.log(user)
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
    console.log('>>>>>> IS NEWLY CREATED', creationTimeString, lastSignInTimeString, differential)
    return differential > CREATION_SENSIBILITY || differential < CREATION_SENSIBILITY
  }
  return false
}

// const mapStateToProps = (state: any, ownProps: ownProps): StateProps => ({
// 	// Metadata
// 	signUpStatus: getRequestStatus(state, {
// 		actionType: SIGN_UP.NAME
// 	})
// })

// const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
// 	handleSignUp: ({ email, password }: AuthData) => dispatch(signUp({ email, password }))
// })

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(AuthLoadingScreen)

export default AuthLoadingScreen
