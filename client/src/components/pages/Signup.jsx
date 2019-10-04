import React, { useState } from 'react'
import api from '../../api'
import './SignUp.scss'

export default function Signup(props) {
  const [state, setState] = useState({
    username: '',
    name: '',
    password: '',
    message: null,
  })

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    let data = {
      username: state.username,
      name: state.name,
      password: state.password,
    }
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="signUpChild">
      <div className="Signup">
        <h2 className="signUpTitle">
          {' '}
          <span>
            <span>S</span>
            <span>i</span>
            <span>g</span>
            <span>n</span>
            <span className="colorSignup">U</span>
            <span className="colorSignup">p</span>
          </span>
        </h2>
        <form className="allInput">
          {' '}
          <input
            placeholder="Username"
            type="text"
            value={state.username}
            name="username"
            onChange={handleInputChange}
            id="inputencore"
            className="input1"
          />{' '}
          <br />{' '}
          <input
            placeholder="Name"
            type="text"
            value={state.name}
            name="name"
            onChange={handleInputChange}
            id="inputencore"
            className="input2"
          />{' '}
          <br />{' '}
          <input
            placeholder="Password"
            type="password"
            value={state.password}
            name="password"
            onChange={handleInputChange}
            id="inputencore"
            className="input3"
          />{' '}
          <br />
          <button onClick={e => handleClick(e)} className="signUpBtn">
            Signup
          </button>
        </form>
        {state.message && (
          <div className="info info-danger">{state.message}</div>
        )}
      </div>
    </div>
  )
}
