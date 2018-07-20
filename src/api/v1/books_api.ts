import api from '../config/api_config'
import axios from 'axios'
import firebase from 'firebase'

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

export default {
    getUserBooks
}

function getUserBooks({ userId }: { userId: string}) {
    return firebase.firestore()
}