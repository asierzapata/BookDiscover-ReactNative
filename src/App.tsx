
import React from 'react'
import { Component } from 'react'
import { Provider } from 'react-redux'
import { reduxStore } from './modules/store'
import Router from './router'
import firebaseConfig from '../config'
import * as firebase from 'firebase'
import { Font } from 'expo'

export default class App extends Component {

  state = {
    fontIsLoaded: false
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    Font.loadAsync({
      'FontAwesome': require('../assets/fonts/FontAwesome.ttf')
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
