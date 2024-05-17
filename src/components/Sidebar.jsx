import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <Navbar />
      <Search />
      <Chats />
      <button onClick={()=>signOut(auth)} className='logOut'>Log Out</button>
    </div>
  )
}

export default Sidebar