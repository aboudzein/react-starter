import React from 'react'

import User from '../../models/User'

class Login extends React.Component {

  constructor() {
    super()
    this._get = this._get.bind(this)
    this._login = this._login.bind(this)
  }

  componentWillMount() {
    this._get()
    User.on('change', this._get)
  }

  componentWillUnmount() {
    User.removeListener('change', this._get)
  }

  _get() {
    // if there's a logged in user and you're on the login page (probably because
    // they *just* logged in), try to redirect you to where they're supposed to go
    if (User.getLoggedInUser()) {
      console.log('logged in; redirecting')

      // check for something like myapp.com/login?redirect_url=/posts
      // TODO - actually parse the query string
      let redirect_url = this.props.history.location.search.split('redirect_url=')[1]
      if (redirect_url) {
        this.props.history.push(redirect_url)
      } else {
        this.props.history.push('/')
      }

    } else {
      console.log('ready to log in')
    }

  }

  _login() {
    User.loginWithGoogle().catch( (err) => {
      alert(err.message)
    })
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <button onClick={this._login}>Log in with Google</button>
      </div>
    )
  }
}

export default Login