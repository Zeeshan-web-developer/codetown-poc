import React from 'react'
import { Typography, Card, CardContent, Grid } from '@mui/material'
import Logo from '../assets/images/select.jpg'
import Styles from '../Pages/ChatBoard.module.css'

function Board() {
  return (
    <Card
      className={Styles.not__receiver}
      style={{
        backgroundImage: `url(${Logo})`,
        height: '100vh',
        backgroundSize: '70%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CardContent>
        <span className={Styles.text__chat}>
          <strong>
            <em>Select a user to chat with</em>
          </strong>
        </span>
      </CardContent>
    </Card>
  )
}

export default Board
