import { FIRESTORE_DB } from "config/firebase";
import {
  FieldValue,
  addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc,
  getDocs, increment, onSnapshot, orderBy, query, setDoc, updateDoc, where, writeBatch,
} from "firebase/firestore";
import { deleteFileFromStorage } from "./fb_storage";

export const checkAdmin = userId => {
  getDoc(doc(FIRESTORE_DB, 'user', userId)).then(doc => {
    console.log(doc.data())
  })
}

export const getUserInfo = userId => {
  return doc(FIRESTORE_DB, 'user', userId)
}

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
  updateDoc(doc(FIRESTORE_DB, 'assignment', docId), data)
}

export const markAssignmentAsFinished = (docId, userId, amount) => {
  updateDoc(doc(FIRESTORE_DB, 'assignment', docId), { finished: true })
  updateDoc(doc(FIRESTORE_DB, 'user', userId), { point: increment(amount) })
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

export const deleteSubjectDocument = subjectId => {
  const subjectDoc = doc(FIRESTORE_DB, 'subject', subjectId)
  const assignmentDoc = query(
    collection(FIRESTORE_DB, 'assignment'),
    where('subjectId', '==', subjectId)
  )

  getDoc(subjectDoc).then(snap => {
    const data = snap.data()
    deleteFileFromStorage(data.image)
    deleteDoc(subjectDoc).then(() => console.log('Subject deleted.'))
  })
  getDocs(assignmentDoc).then(snap => {
    const batch = writeBatch(FIRESTORE_DB)
    snap.forEach(doc => batch.delete(doc.ref))
    return batch.commit()
  })
}

export const addTimetable = (subjectId, day, startTime, endTime) => {
  const [h, m] = startTime.split(':')
  const [hEnd, mEnd] = endTime.split(':')

  updateDoc(doc(FIRESTORE_DB, 'subject', subjectId), {
    timetable: arrayUnion({ day, h, m, hEnd, mEnd })
  })
}

export const deleteTimetable = (subjectId, data) => {
  const { day, startTime, endTime } = data
  const [h, m] = startTime.split(':')
  const [hEnd, mEnd] = endTime.split(':')

  updateDoc(doc(FIRESTORE_DB, 'subject', subjectId), {
    timetable: arrayRemove({ day, h, m, hEnd, mEnd }),
  })
}

export const getRewardsCollection = () => {
  return collection(FIRESTORE_DB, 'reward')
}

export const decrementRewardRemaining = rewardId => {
  updateDoc(doc(FIRESTORE_DB, 'reward', rewardId), {
    remaining: increment(-1),
  })
}

export const getRedeemsCollection = userId => {
  return query(
    collection(FIRESTORE_DB, 'redeem'),
    where('userId', '==', userId)
  )
}

export const addRedeemDocument = data => {
  addDoc(collection(FIRESTORE_DB, 'redeem'), data)
  decrementRewardRemaining(data.rewardId) //! -1 reward remaining
  decrementUserPoint(data.userId, data.point) //! -n user points
}

export const decrementUserPoint = (userId, amount) => {
  updateDoc(doc(FIRESTORE_DB, 'user', userId), {
    point: increment(amount * -1)
  })
}

// const col = collection(FIRESTORE_DB, 'assignment')
// const document = doc(col, 'ibQUlLnUb55EIlYvHy9X')

// onSnapshot(document, {
//   next: snap => console.log('next: ' + JSON.stringify(snap.data()))
// })
