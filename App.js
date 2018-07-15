
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { reduxStore } from './src/modules/store'
import Router from './src/router'
import { firebaseConfig } from './config'
import * as firebase from "firebase"


export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <Provider store={reduxStore}>
        <Router />
      </Provider>
    );
  }
}
