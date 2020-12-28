import firebase from 'firebase';
import 'firebase/firestore'
import {APIKey, AUTHD, PID, SB, MSID, APPID} from '@env';

const firebaseConfig = {
    apiKey: APIKey,
    authDomain: AUTHD,
    projectId: PID,
    storageBucket: SB,
    messagingSenderId: MSID,
    appId: APPID,
}

let Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export default Firebase
