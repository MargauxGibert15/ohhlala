import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'
import './LogInn.scss'

export default function Login(props) {
  const { formValues, getInputProps } = useForm({ lang: 'en' })

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.username, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  const [message, setMessage] = useState(null)

  return (
    <div className="signUpChild">
      <div className="Login">
        <h2 className="loginTitle">
          {' '}
          <span>
            <span>S</span>
            <span>i</span>
            <span>g</span>
            <span>n</span>
            <span className="colorSignup">I</span>
            <span className="colorSignup">n</span>
          </span>
        </h2>
        <form onSubmit={handleSubmit} className="allInput">
          <input
            type="text"
            placeholder="Username"
            className="input5"
            id="inputencore"
            {...getInputProps('username')}
          />{' '}
          <br />
          <input
            type="password"
            placeholder="Password"
            className="input6"
            id="inputencore"
            {...getInputProps('password')}
          />{' '}
          <br />
          <button className="signUpBtn">Login</button>
        </form>
        {message && <div className="info info-danger">{message}</div>}
      </div>
    </div>
  )
}
