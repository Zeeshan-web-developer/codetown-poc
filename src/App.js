import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import Login from './Pages/Login'
import Chat from './Pages/ChatBoard'
import Spinner from './components/Spinner'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    JSON.parse(localStorage.getItem('user'))
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])
  return loading ? (
    <Spinner />
  ) : (
    <Router>
      <Switch>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/chat">
          {isLoggedIn ? <Chat /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
