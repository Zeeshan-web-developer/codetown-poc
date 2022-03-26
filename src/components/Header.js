import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import { Typography, Tooltip } from '@mui/material'
import { Call, Help, VideoCall } from '@mui/icons-material'
import { Box } from '@mui/system'

function Header() {
  const user = useSelector((state) => state.user)
  console.log(user)
  return (
    <Box
      sx={{
        py: 2,
        px: 4,
        display: { md: 'none', lg: 'block' },
        borderBottom: 1,
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingY: 1,
        }}
      >
        <div className="position-relative">
          <Avatar
            alt="avatar"
            src={
              user?.chatWith?.photoURL
                ? user.chatWith.photoURL
                : 'https://via.placeholder.com/32'
            }
          />
        </div>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            paddingLeft: 1,
          }}
        >
          <strong style={{ marginLeft: '2px' }}>
            {user?.chatWith?.displayName ?? 'Ahmad'}
          </strong>
          <Box component="div">
            <Typography variant="caption" color="textSecondary">
              <em>Typing...</em>
            </Typography>
          </Box>
        </Box>
        <Box component="div">
          <Tooltip title="Video Call">
            <Box
              component="span"
              sx={{
                marginRight: 1,
                paddingX: 1,
                cursor: 'pointer',
              }}
            >
              <VideoCall />
            </Box>
          </Tooltip>
          <Tooltip title="Call">
            <Box
              component="span"
              sx={{
                marginRight: 1,
                paddingX: 1,
                cursor: 'pointer',
              }}
            >
              <Call />
            </Box>
          </Tooltip>
          <Tooltip title="Help">
            <Box
              component="span"
              sx={{
                marginRight: 1,
                paddingX: 1,
                cursor: 'pointer',
              }}
            >
              <Help />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
