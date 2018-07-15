import api from '../config/api_config'
import axios from 'axios'
import firebase from "firebase"
import "firebase/functions";

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default {
  exampleFunction
}

function exampleFunction({ var1, var2 }) {
  // This example is with Firebase but could be also be done with usuarl urls and axios
  // const exampleFirebaseFunction = firebase.functions().httpsCallable('exampleFirebaseNameFunction') // Firebase
  // return exampleFirebaseFunction({ summonerName, region })
  //   .then(response => {
  //     return {
  //       headers: response.headers,
  //       status: response.status,
  //       statusText: response.statusText,
  //       data: response.data
  //     }
  //   })
}
