import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', invalid: ''}

  submit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const body = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    }

    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const value = data.jwt_token
      Cookies.set('jwt_token', value, {
        expires: 30,
      })
      const {history} = this.props
      history.replace('/')
    } else {
      console.log(data.error_msg)
      this.setState({invalid: data.error_msg})
    }
  }

  onchangeuser = event => {
    this.setState({username: event.target.value})
  }

  onchangepass = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {invalid} = this.state
    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.submit}>
            <div className="username-con">
              <label className="label" htmlFor="username">
                USER NAME
              </label>
              <br />
              <input
                className="input"
                id="username"
                type="text"
                onChange={this.onchangeuser}
              />
            </div>
            <div className="username-con">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                className="input"
                id="password"
                type="password"
                onChange={this.onchangepass}
              />
            </div>
            <p className="invalid">{invalid}</p>
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
