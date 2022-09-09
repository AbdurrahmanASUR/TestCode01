import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  signInAnonymously,
  linkWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getDatabase, ref as dbRef, set, get, update,remove,child } from 'firebase/database'

initializeApp({
  apiKey: 'AIzaSyC9sMLhggiIllgZ6DtLSZ0Z1dbTH7z0Jck',
  authDomain: 'tm1closettest.firebaseapp.com',
  databaseURL: 'https://tm1closettest-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tm1closettest',
  storageBucket: 'tm1closettest.appspot.com',
  messagingSenderId: '867105914894',
  appId: '1:867105914894:web:c4d72bd834ec20db893c5f',
})

const auth = getAuth()
const storage = getStorage()
const database = getDatabase()

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  updatePassword,
  linkWithCredential,
  EmailAuthProvider,
  deleteUser,
  //
  storage,
  storageRef,
  uploadBytes,
  getDownloadURL,
  //
  database,
  dbRef,
  set,
  get,
  update,
  remove,
}
