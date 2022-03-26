import React from 'react'
import { useSelector } from 'react-redux'
import '../App.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Spinner from '../components/Spinner'
import Board from '../components/Board'
import { Card, Container, Grid } from '@mui/material'
function ChatBoard() {
  const receiver = useSelector((state) => state.user.chatWith)
  const users = useSelector((state) => state.user.users)

  if (!users) {
    return <Spinner />
  } else {
    return (
      <Container>
        <Card>
          <Grid container spacing={0}>
            <Grid item xs={12} md={4} style={{ backgroundColor: '#c0f2ef' }}>
              <Sidebar />
            </Grid>
            {!receiver ? (
              <Grid item xs={12} md={8}>
                <Board />
              </Grid>
            ) : (
              <Grid item xs={12} md={8} style={{ backgroundColor: '#b3c2ce' }}>
                <Header />
                <Footer />
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
    )
  }
}

export default ChatBoard
