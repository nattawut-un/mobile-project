import { FIRESTORE_DB } from "config/firebase";
import {
  addDoc, collection, deleteDoc, doc, getDoc,
  getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where,
} from "firebase/firestore";

export const getAssignmentsCollection = userId => {
  return query(
    collection(FIRESTORE_DB, 'assignment'),
    where('ownerUID', '==', userId)
  )
}

export const addAssignmentDocument = data => {
  addDoc(collection(FIRESTORE_DB, 'assignment'), data)
}

export const saveAssignmentDocument = (docId, data) => {
  setDoc(doc(FIRESTORE_DB, 'assignment', docId), data)
}

export const markAssignmentAsFinished = docId => {
  updateDoc(doc(FIRESTORE_DB, 'assignment', docId), { finished: true })
}

export const deleteAssignmentDocument = docId => {
  deleteDoc(doc(FIRESTORE_DB, 'assignment', docId))
}

export const getSubjectsCollection = userId => {
  return query(
    collection(FIRESTORE_DB, 'subject'),
    where('ownerUID', '==', userId)
  )
}

export const getSubjectsCollectionData = userId => {
  const query = getSubjectsCollection(userId)
  var data = []

  getDocs(query).then(snap =>
    snap.forEach(doc => data.push({ ...doc.data(), key: doc.id }))
  )

  return data
}

export const addSubjectDocument = data => {
  addDoc(collection(FIRESTORE_DB, 'subject'), data)
}

export const deleteSubjectDocument = docId => {
  deleteDoc(doc(FIRESTORE_DB, 'subject', docId))
}

// const col = collection(FIRESTORE_DB, 'assignment')
// const document = doc(col, 'ibQUlLnUb55EIlYvHy9X')

// onSnapshot(document, {
//   next: snap => console.log('next: ' + JSON.stringify(snap.data()))
// })
