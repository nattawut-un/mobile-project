import { initializeApp } from 'firebase/app'

import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_GOOGLE_APP_ID,
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)
