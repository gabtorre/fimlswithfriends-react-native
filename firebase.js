import firebase from "firebase/app"
import "firebase/firestore"
import {APIKey, AUTHD, PID, SB, MSID, APPID} from '@env';

var firebaseConfig = {
    apiKey: APIKey,
    authDomain: AUTHD,
    projectId: PID,
    storageBucket: SB,
    messagingSenderId: MSID,
    appId: APPID,
}

if(!firebase.apps.length){firebase.initializeApp(firebaseConfig)}

export const firestore = firebase.firestore()

export default firebase