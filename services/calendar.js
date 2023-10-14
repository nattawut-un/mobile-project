// import { FIRESTORE_DB } from "config/firebase";
import { firebase } from 'config/firebase'

const db = firebase.firestore()

export const appointmentsCollection = db.collection('appointment')
