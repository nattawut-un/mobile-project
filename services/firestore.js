import { FIRESTORE_DB } from "config/firebase";
import { firebase } from 'config/firebase'
import { addDoc, collection, doc, getDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";

const db = firebase.firestore()

export const getAssignmentsCollection = userId => {
  return query(
    collection(FIRESTORE_DB, 'assignment'),
    where('ownerUID', '==', userId)
  )
}

export const saveSubjectDocument = assignment => {
  addDoc(collection(FIRESTORE_DB, 'assignment'), assignment)
}

export const getSubjectsCollection = userId => {
  return query(
    collection(FIRESTORE_DB, 'subject'),
    where('ownerUID', '==', userId)
  )
}

// const col = collection(FIRESTORE_DB, 'assignment')
// const document = doc(col, 'ibQUlLnUb55EIlYvHy9X')

// onSnapshot(document, {
//   next: snap => console.log('next: ' + JSON.stringify(snap.data()))
// })
