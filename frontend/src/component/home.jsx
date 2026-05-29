import React from 'react'
import { useContext } from 'react'
import { Usercontext } from '../userContext'

export default function home() {
  let [userdata, setUserdata] = useContext(Usercontext)
  return (
    <div>WELCOME {userdata?.name}</div>
  )
}
