import React from 'react'
import { useContext } from 'react'
import { Usercontext } from '../userContext'
import { useState } from 'react';

export default function profile() {
    let [userdata, setUserdata] = useContext(Usercontext)
    let [updateduser, setupdateduser] = useState(userdata)
    console.log(userdata);
    let changehandler = (e) => {
        console.log(e.target.name, e.target.value);

        setupdateduser({ ...updateduser, [e.target.name]: e.target.value })
    }

    let [display, setdisplay] = useState(false)
    let edit = () => {
        setdisplay(!display)
    }
    let submithandler = (e) => {
        e.preventDefault()
        console.log(updateduser);
        fetch('http://localhost:4001/things/update', {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updateduser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert(data.msg)
                setUserdata(data.data)
            })
            .catch(err => console.error("here is your problem ", err))
        // setupdateduser({ name: '', email: '', password: '' })
    }

    console.log(updateduser);

    return (

        <div className='card'>
            <form action="" onSubmit={submithandler} style={{ display: (display) ? "block" : "none" }}>
                <input type="text" value={updateduser.name} onChange={changehandler} name="name" id="name" /><br />
                <input type="text" value={updateduser.email} onChange={changehandler} name="email" id="email" /><br />
                <input type="text" value={updateduser.password} onChange={changehandler} name="password" id="password" /><br />
                <button>update</button>
            </form>
            <div style={{ display: (display) ? "none" : "block" }}>

                <p>name {userdata.name}</p>
                <p>email {userdata.email}</p>
                <p>password {userdata.password}</p>
            </div>
            <button onClick={edit}>edit</button>
        </div>
    )
}
