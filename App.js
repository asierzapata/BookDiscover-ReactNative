
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { reduxStore } from './src/modules/store'
import Router from './src/router'
import firebaseConfig from './config'
import * as firebase from 'firebase'
import { Font } from 'expo'

export default class App extends Component {

  state = {
    fontIsLoaded: false
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    Font.loadAsync({
      'FontAwesome': require('./assets/fonts/FontAwesome.ttf')
    })
    .then(() => this.setState({ fontIsLoaded: true }))
  }
  render() {
    if(!this.state.fontIsLoaded) return null
    return (
      <Provider store={reduxStore}>
        <Router />
      </Provider>
    );
  }
}
