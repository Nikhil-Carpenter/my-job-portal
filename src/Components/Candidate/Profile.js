import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {

    const userdata = useSelector((state)=>state.candidateList.profile)
    console.log(userdata);

  return (
    <h1>user profile</h1>
    )
}
