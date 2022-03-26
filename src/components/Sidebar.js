import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, TextField, Box, Tooltip } from '@mui/material'
import { Logout } from '@mui/icons-material'
import firebase from 'firebase'
import { auth } from '../firebase'
import User from './User'

function Sidebar() {
  const [user, setUser] = useState(null)
  const history = useHistory()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  }, [])

  const logout = () => {
    // firebase signout
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('user')
        setUser(null)
        history.push('/login')
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <div className="px-4">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            marginTop: '10px',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <Avatar
            sx={{ width: 32, height: 32, marginRight: '10px' }}
            src={
              user?.photoURL ? user.photoURL : 'https://via.placeholder.com/32'
            }
          />
          <TextField
            className="search__box"
            id="input-with-sx"
            label="search..."
            variant="standard"
            size="small"
          />

          <Tooltip title="Logout" placement="bottom">
            <Logout
              onClick={logout}
              sx={{
                cursor: 'pointer',
                color: 'red',
              }}
            />
          </Tooltip>
        </Box>
      </div>

      <User />
    </div>
  )
}

export default Sidebar
