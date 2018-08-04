import React from 'react'
import { Component } from 'react'
import { Provider } from 'react-redux'
import { reduxStore, persistor } from './modules/store'
import Router from './router'
import firebaseConfig from './config'
import * as firebase from 'firebase'
import { Font } from 'expo'
import { PersistGate } from 'redux-persist/integration/react'

export default class App extends Component {
	state = {
		fontIsLoaded: false
	}

	componentDidMount() {
		firebase.initializeApp(firebaseConfig)
		const firestore = firebase.firestore()
		const settings = { timestampsInSnapshots: true }
		firestore.settings(settings)
		Font.loadAsync({
			FontAwesome: require('../assets/fonts/FontAwesome.ttf')
		}).then(() => this.setState({ fontIsLoaded: true }))
	}
	render() {
		if (!this.state.fontIsLoaded) return null
		return (
			<PersistGate loading={null} persistor={persistor}>
				<Provider store={reduxStore}>
					<Router />
				</Provider>
			</PersistGate>
		)
	}
}
