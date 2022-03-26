import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyAtUN2p1lWEbzYekExYRARH97dNFXxcANw',
  authDomain: 'codetownchat.firebaseapp.com',
  projectId: 'codetownchat',
  storageBucket: 'codetownchat.appspot.com',
  messagingSenderId: '118370080552',
  appId: '1:118370080552:web:b758001a62ba715b18e21d',
  measurementId: 'G-1SN341BKFX',
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
