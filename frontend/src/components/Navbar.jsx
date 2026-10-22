import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen,setIsOpen]=useState(false)
  let user=JSON.parse(localStorage.getItem("user"))
  const [isLogin,setIsLogin]=useState(user ? false : true)

  useEffect(()=>{
    setIsLogin(user ? false : true)
  },[isOpen])

  const checkLogin=()=>{
    if(user){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)

    }
    else{
      setIsOpen(true)
    }
  }

  return (
    <>
        <header>
            <h2>Food Blog</h2>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
                <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
                <li onClick={checkLogin}><p className='login'>{ (isLogin)? "Login": "Logout" }{user?.email ? `(${user?.email})` : ""}</p></li>
            </ul>
        </header>
       { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}
