import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  loginSuccess = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFormData = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userData = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.loginSuccess(data)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-image-container">
          <img
            src="https://images.unsplash.com/photo-1755811248324-3c9b7c8865fc?auto=format&fit=crop&w=1200&q=80"
            alt="premium restaurant food"
            className="login-image"
          />
          <div className="login-image-content">
            <h1>Good Food</h1>
            <h1>Brings People Together</h1>
            <p>Fresh Ingredients • Great Taste • Happy You</p>
          </div>
        </div>

        <div className="login-form-container">
          <form onSubmit={this.onSubmitFormData}>
            <h1>Restaurant Login</h1>

            <label htmlFor="userName">Username</label>

            <input
              type="text"
              value={username}
              id="userName"
              placeholder="Enter your username"
              onChange={this.onChangeUserName}
            />

            <label htmlFor="Password">Password</label>

            <input
              type="password"
              value={password}
              id="Password"
              placeholder="Enter your password"
              onChange={this.onChangePassword}
            />

            <button type="submit">Login</button>

            {errorMsg !== '' && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
