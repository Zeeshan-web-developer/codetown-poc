import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { auth, provider } from '../firebase'
import db from '../firebase'
import Styles from './Login.module.css'
import { setUser } from '../store/actions'
import { Box } from '@mui/system'
function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const LoginWithGoogle = async () => {
    try {
      const user = await auth.signInWithPopup(provider)
      // check if user exists in db
      const userRef = db.collection('users').doc(user.user.uid)
      const userDoc = await userRef.get()
      if (!userDoc.exists) {
        // if not, add user to db
        await userRef.set({
          displayName: user.user.displayName,
          email: user.user.email,
          photoURL: user.user.photoURL,
          id: user.user.uid,
          createdAt: Date.now(),
          lastLogin: Date.now(),
          updatedAt: Date.now(),
        })
        localStorage.setItem('user', JSON.stringify(user.user))
        dispatch(setUser(user.user))
        window.location.href = '/chat'
      } else {
        // if exists, update user
        await userRef.update({
          displayName: user.user.displayName,
          photoURL: user.user.photoURL,
          lastLogin: Date.now(),
          updatedAt: Date.now(),
        })
        localStorage.setItem('user', JSON.stringify(user.user))
        dispatch(setUser(user.user))
        window.location.href = '/chat'
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={Styles.login}>
      <Box sx={{}}>
        <Button
          variant="contained"
          color="primary"
          onClick={LoginWithGoogle}
          sx={{
            width: '100%',
            marginBottom: '16px',
          }}
        >
          Login with Google
        </Button>
      </Box>
    </div>
  )
}

export default Login
