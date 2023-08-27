"use client";
import ChatBot from '@/components/ChatBot'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import axios from 'axios';

const Page = ({params}) => {
  const [filter, setFilter] = useState({})
  const [isloggedin, setIsloggedin] = useState(true)
  const [user, setUser] = useState({})
  const [ischatbotvisible, setIschatbotvisible] = useState(false)
  const [prod, setProd] = useState({})
  useEffect(() => {
    const getProduct = async()=>{
      const url = `http://127.0.0.1:8000/getProdById/?id=${params.productId}`
      const response = await axios.get(url)
      setProd(JSON.parse(response.data.data)[0])
    }
    getProduct();
  }, [params.productId])
  
  return (
    <div className="w-screen h-screen bg-white">
      <Header
        filter = {filter}
        setFilter = {setFilter}
        isloggedin = {isloggedin}
        setIsloggedin = {setIsloggedin}
        user = {user}
        setUser = {setUser}
      />
      <div className='w-full h-[92.5%] flex flex-row justify-center items-center'>
        <img src={prod.link} className='h-[80%] w-[30%]'/>
        <div className='h-[80%] w-[68%] text-black text-3xl flex justify-center items-center'>
          {prod.productDisplayName}
        </div>
      </div>
      <ChatBot
          clicked = {true}
          clickedOn = {prod.productDisplayName}
          ischatbotvisible = {ischatbotvisible}
          setIschatbotvisible = {setIschatbotvisible}
          isloggedin = {isloggedin}
          user = {user}
        />
    </div>
  )
}

export default Page