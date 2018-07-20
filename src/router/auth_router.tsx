import { createStackNavigator } from 'react-navigation';

/* ====================================================== */
/*                       Screens                          */
/* ====================================================== */

import AuthSelectorScreen from '../screens/auth_selector_screen/auth_selector_screen'
import AuthSignInScreen from '../screens/auth_sign_in_screen/auth_sign_in_screen'
import AuthSignUpScreen from '../screens/auth_sign_up_screen/auth_sign_up_screen'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default createStackNavigator(
    {
        AuthSelector: AuthSelectorScreen,
        AuthSignIn: AuthSignInScreen,
        AuthSignUp: AuthSignUpScreen,
    },
    {
        initialRouteName: 'AuthSelector',
    }
);