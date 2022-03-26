import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Box, Typography } from '@mui/material'
import { chatWith, setUsers } from '../store/actions'
import db from '../firebase'
import Spinner from './Spinner'
function User() {
  const dispatch = useDispatch()
  const [userid, setUser] = useState(null)
  const users = useSelector((state) => state.user.users)

  const getAllUsers = async () => {
    db.collection('users').onSnapshot((snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      dispatch(setUsers(users))
    })
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUser(user.uid)
    }

    getAllUsers()
    return () => {}
  }, [])
  return (
    <div>
      {users ? (
        users
          .filter((user) => user.id !== userid)
          .map((user) => (
            <Box
              component="div"
              className="user__hover"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                paddingY: 2,
                paddingX: 4,
                borderBottom: 0,
                borderTop: 0,
                marginBottom: 0.2,
              }}
              key={user.id}
              style={{ backgroundColor: '#6ce0da', color: 'white' }}
              onClick={() => dispatch(chatWith(user))}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Avatar
                  src={user?.photoURL}
                  alt="Doris Wilder"
                  sx={{
                    width: '32px',
                    height: '32px',
                    marginRight: '10px',
                    rounded: '50%',
                    resizeMode: 'cover',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginX: '10px',
                  }}
                >
                  {user.displayName}
                </Typography>
              </Box>

              <Box component="span">
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '16px',
                    color: '#25D366',
                    marginTop: '5px',
                    marginRight: '10px',
                  }}
                >
                  {user.isOnline ? 'Online' : 'Offline'}
                </Typography>
              </Box>
            </Box>
          ))
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default User
