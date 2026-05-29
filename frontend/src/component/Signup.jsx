import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        // console.log({ ...user, [e.target.name]: e.target.value })


    }
    const shandler = (e) => {
        e.preventDefault()
        console.log("name : ", user.name)
        console.log("email : ", user.email)
        console.log("password : ", user.password)
        fetch('http://localhost:4001/things/signup', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Signup successed : ", data)
                alert(data.msg)
            })
            .catch(err => console.error("here is your problem ", err))
        navigate('/signin')
        setUser({ name: '', email: '', password: '' })
    }


    return (
        <>
            <form onSubmit={shandler}>
                <div className="mb-3">
                    <label htmlFor="exampleInputText1" className="form-label">User Name : </label>
                    <input type="text"
                        onChange={handler}
                        value={user.name}
                        required
                        name='name'
                        className="form-control"
                        id="exampleInputText1"
                        aria-describedby="TextHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email"
                        onChange={handler}
                        value={user.email}
                        required
                        name='email'
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password"
                        onChange={handler}
                        value={user.password}
                        required
                        name='password'
                        className="form-control"
                        id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
            <p> if you all ready logged in then <Link to={'/signin'}>Sign in</Link> here </p>
        </>
    )
}
