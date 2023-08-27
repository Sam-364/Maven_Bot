"use client";
import DisplayProds from '@/components/DisplayProds';
import Filter from '@/components/Filter'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ChatBot from '@/components/ChatBot';

export default function Home() {
  const [filter, setFilter] = useState({})
  const [pagenum, setPagenum] = useState(1)
  const [pageData, setPageData] = useState([])
  const [isloggedin, setIsloggedin] = useState(false)
  const [user, setUser] = useState({})
  const [ischatbotvisible, setIschatbotvisible] = useState(false)
  useEffect(() => {
    const getData = async() => {
      var baseURL = `http://127.0.0.1:8000/getAllProd/?page_number=${pagenum}`
      Object.keys(filter).map((key)=>{
        baseURL = baseURL.concat(`&${key}=${filter[key]}`)
      })
      const response = await axios.get(baseURL)
      const data = JSON.parse(response.data.data)
      setPageData(data);
    }
    getData();
  }, [filter, pagenum])
  
  return (
    <div className='w-screen h-screen bg-white'>
      <Header
        filter = {filter}
        setFilter = {setFilter}
        isloggedin = {isloggedin}
        setIsloggedin = {setIsloggedin}
        user = {user}
        setUser = {setUser}
      />
      <div className='bg-[#f1f3f6] w-full h-[92.5%] flex flex-row justify-evenly items-center'>
        <Filter
          filter = {filter}
          setFilter = {setFilter}
        />
        <DisplayProds
          setPagenum = {setPagenum}
          pagenum = {pagenum}
          pageData = {pageData}
        />
        <ChatBot
          clicked = {false}
          ischatbotvisible = {ischatbotvisible}
          setIschatbotvisible = {setIschatbotvisible}
          isloggedin = {isloggedin}
          user = {user}
        />
      </div>
    </div>
  )
}
