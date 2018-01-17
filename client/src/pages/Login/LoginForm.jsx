import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'

class Login extends Component {
  state = {
    username: '',
    password: '',
    redirectTo: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {
      username,
      password
    } = this.state

    console.log('handleSubmit')

    this.props._login(username, password)
    this.setState({
      redirectTo: '/'
    })
  }

  render() {
    const {
      redirectTo,
      username,
      password
    } = this.state

    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} />
    } else {
      return (

      <div className="modal fade" id="myModal">
         <div className="modal-dialog">
           <div className="modal-content">


             <div className="modal-header">
               <h4 className="modal-title">Modal Heading</h4>
               <button type="button" className="close" data-dismiss="modal">&times;</button>
             </div>


             <div className="modal-body">
             <div className="LoginForm">
               <h1>Login form</h1>
               <form>
                 <label htmlFor="username">Username: </label>
                 <input
                   type="text"
                   name="username"
                   value={username}
                   onChange={this.handleChange}
                 />
                 <label htmlFor="password">Password: </label>
                 <input
                   type="password"
                   name="password"
                   value={password}
                   onChange={this.handleChange}
                 />
                 <button onClick={this.handleSubmit}>Login</button>
               </form>
               <a href="/auth/google">
               <img src={googleButton} alt="sign into Google Button" />
              </a>
             </div>
             </div>

        
             <div className="modal-footer">
               <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
             </div>

           </div>
         </div>
       </div>


      )
    }
  }
}

export default Login
