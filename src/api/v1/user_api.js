import _ from 'lodash'
import api from '../config/api_config'
import * as firebase from 'firebase'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default {
    getUserBooks
}

/* ====================================================== */
/*                        Content                         */
/* ====================================================== */

function getUserBooks() {
    const userId = firebase.auth().currentUser.uid
    return firebase.firestore().collection("users").doc(userId).get()
        .then((document) => {
            if (doc.exists) {
                
            } else {
                return ({
                    data: undefined,
                    error: 'Not Found',
                })
            }
        })
    return firebase.database().ref(`/users/${userId}`).once('value')
        .then((snapshot) => ({
            data: snapshot.val().books,
            error: undefined
        }))
}

function getUserInfo() {
    const userId = firebase.auth().currentUser
    return new Promise((resolve, reject) => {
        if(user) {
            resolve({ 
                data: user,
                error: undefined
            })
        }
        reject({ 
            data: undefined, 
            error: ''
        })
    })
}

