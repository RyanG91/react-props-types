import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import decodeJWT from 'jwt-decode'
import { api, setJwt } from './api/init'
import Bookmark from './components/Bookmark'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import types from 'prop-types'
import BookmarkListContainer from './components/BookmarkListContainer'
import store from './store'


class App extends Component {
  state = {
    bookmarks: [],
    loginError: null
  }

  get token() {
    return localStorage.getItem('token')
  }

  set token(value) {
    localStorage.setItem('token', value)
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('/auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      this.token = response.data.token
      setJwt(response.data.token)
      this.forceUpdate()
      // BookmarkListContainer.fetchBookmarks()
      //this.forceUpdate()
    } catch (error) {
      this.setState({ loginError: error.message })
    }
  }

  handleSignOut = (event) => {
    api.get('/auth/logout').then(() => {
      localStorage.removeItem('token')
      this.setState({ bookmarks: [] })
      //this.forceUpdate()
    })
  }

  render() {
    const tokenDetails = this.token && decodeJWT(this.token)
    return (
      <div className="App">
      {
        <Router>
          <Fragment>
            <Route exact path="/login" render={(props) => {
              if (this.token) {
                return (<Redirect to="/bookmarks"/>)
              } else {
                return (<SignIn loginError={this.state.loginError} handleSignIn={this.handleSignIn} />)
              }
            }
            } />
            <Route exact path="/bookmarks" render={(props) => (
              this.token ? (
                <Fragment>
                  <h4>Welcome { tokenDetails.email }!</h4>
                  <p>You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleString() }</p>
                  <p>Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() }</p>
                  <button onClick={this.handleSignOut}>Logout</button>
                  <BookmarkListContainer />
                </Fragment>
              ) : (
                <Redirect to="/login"/>
              )
            )}/>
            </Fragment>
        </Router>
        }
      </div>
    );
  }

  componentDidMount() {
    if (this.token) {
      setJwt(this.token)
      this.forceUpdate()
      
      // BookmarkListContainer.fetchBookmarks()
    }
  }
}


export default App;
