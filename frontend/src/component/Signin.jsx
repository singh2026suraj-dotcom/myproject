import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Usercontext } from '../userContext'

export default function Signin() {
  let [userdata, setUserdata] = useContext(Usercontext)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const handler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    // console.log({ ...user, [e.target.name]: e.target.value })

  }
  const shandler = (e) => {
    e.preventDefault()
    console.log("email : ", user.email)
    console.log("password : ", user.password)
    fetch('http://localhost:4001/things/signin', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {

        console.log("Signin successed : ", data)
        if (data.msg != "register first!") {
          setUserdata(data.data)
          console.log(userdata);

          navigate('/')
        } else {
          alert(data.msg)

        }
      })
      .catch(err => console.error("here is your problem ", err))
    setUser({ name: '', email: '', password: '' })
  }


  return (
    <div>
      <form onSubmit={shandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email"
            name='email'
            onChange={handler}
            value={user.email}
            required
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password"
            onChange={handler}
            name='password'
            value={user.password}
            required
            className="form-control"
            id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <p> if you forget password then <Link to={'/signup'}>Sign up</Link> here </p>
    </div>
  )
}
