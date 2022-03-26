import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import { Box, Button, TextField } from '@mui/material'
import db from '../firebase'

function Footer() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [senderId, setSenderId] = useState('')
  const [receiverId, setReceiverId] = useState('')
  const receiver = useSelector((state) => state.user.chatWith)
  const messagesEndRef = useRef(null)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (user) {
      setSenderId(user.uid)
      console.log(user.uid)
    }
    if (receiver) {
      setReceiverId(receiver.id)
      console.log(receiver.id)
    }
  }, [receiver])

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])
  // ! const getAllmessages
  useEffect(() => {
    //  get snapshot of all messages
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setMessages(messages)
      })
  }, [])

  // ! this is for sending message
  const sendMsg = async (e) => {
    e.preventDefault()
    //add document to firebase
    db.collection('messages').add({
      message,
      senderId,
      receiverId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setMessages([
      ...messages,
      { message, timestamp: Date.now(), senderId, receiverId },
    ])
    setMessage('')
  }

  return (
    <>
      <div className="position-relative">
        <div className="chat-messages p-4">
          {messages &&
            messages.map((message, index) => {
              if (
                message.senderId === senderId &&
                message.receiverId === receiverId
              ) {
                return (
                  <Box
                    sx={{
                      paddingBottom: 2,
                    }}
                    className="msg msg_to chat-message-right"
                    key={index}
                  >
                    <div className="recepient">
                      <span className="icon"></span>
                    </div>
                    <div className="content">{message.message}</div>
                  </Box>
                )
              } else if (
                message.receiverId === senderId &&
                message.senderId === receiverId
              ) {
                return (
                  <Box
                    sx={{
                      paddingBottom: 4,
                      marginLeft: 2,
                    }}
                    className="chat-message-left"
                    key={index}
                  >
                    <Box
                      sx={{
                        paddingBottom: 2,
                      }}
                      className="msg msg_from chat-message-right"
                      key={index}
                    >
                      <div className="recepient">
                        <span className="icon"></span>
                      </div>
                      <div className="content">{message.message}</div>
                    </Box>
                    <div ref={messagesEndRef}></div>
                  </Box>
                )
              }
            })}
        </div>
      </div>
      <div className="flex-grow-0 py-3 px-4 border-top">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            fullWidth
            size="small"
            label="Type your message"
            id="fullWidth"
            value={message}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMsg(e)
              }
            }}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button variant="contained" onClick={sendMsg} size="small">
            Send
          </Button>
        </div>
      </div>
    </>
  )
}

export default Footer
