"use client";
import Link from "next/link";
import React, {useState} from "react";
import axios from "axios";

const Header = (props) => {
    const [formdata, setFormdata] = useState({
        email: "",
        password: ""
    })
    const [isloggingin, setIsloggingin] = useState(false)
    const loginUser = async() => {
        const response = await axios.post("http://127.0.0.1:8000/logIn/", formdata)
        const userdata = JSON.parse(response.data.user)
        props.setUser(userdata[0])
        setIsloggingin(false)
        props.setIsloggedin(true)
    }
  return (
    <div className="w-full h-[7.5%] bg-[#2874F0] flex flex-row justify-evenly items-center">
      <div className="flex flex-col justify-evenly items-center w-[7.5%]">
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
          className="w-[70%]"
        />
        <div className="flex flex-row justify-between items-center w-[90%]">
          <span className="">Explore</span>
          <span className="text-[#ffe500]">Plus</span>
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png"
            className="w-[15%]"
          />
        </div>
      </div>
      <div className="w-[30%]">
        <input
          placeholder="Search for Product, Brands and More"
          className="w-full placeholder:text-sm flex justify-center p-[7px] text-black"
          value={props.filter["q"]}
          onChange={(e) => {
            if (e.target.value === "") {
              const { q, ...rest } = props.filter;
              props.setFilter(rest);
            } else {
              props.setFilter({ ...props.filter, q: e.target.value });
            }
          }}
        />
      </div>
      <div className="w-[20%] h-full flex flex-row justify-evenly items-center">
      {isloggingin?
        <div className="w-screen h-screen absolute left-0 top-0 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="w-2/5 h-2/5 bg-slate-200 flex flex-col justify-evenly items-center text-black">
            <div className="w-1/2 h-1/4 flex flex-row justify-evenly items-center">
              <label className="text-black " for="email">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formdata["email"]}
                onChange={(e) => {
                  setFormdata({ ...formdata, email: e.target.value });
                }}
              />
            </div>
            <div className="w-1/2 h-1/4 flex flex-row justify-evenly items-center">
              <label className="text-black " for="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formdata["password"]}
                onChange={(e) => {
                  setFormdata({ ...formdata, password: e.target.value });
                }}
              />
            </div>
            <button
              className="w-1/4 h-[15%] bg-[#2874F0] rounded-full"
              onClick={() => {
                loginUser();
              }}
            >
              Submit
            </button>
          </div>
          </div>
      :
      <></>
      }
      {props.isloggedin?
      <div>Hey, {props.user.username}</div>
      :
      <>
      <div
          className="bg-white w-[40%] h-[50%] text-[#2874F0] hover:bg-[#3b65a9] hover:text-white transition-all text-center"
          onClick={()=>{setIsloggingin(true)}}
        >
          Login
        </div>
        
        <Link
          href="signup/"
          className="bg-[#3b65a9] w-[40%] h-1/2 text-[#fff] text-center hover:bg-[#fff] hover:text-[#3b65a9] transition-all "
        >
          Signup
        </Link>
      </>
      }
        
      </div>
    </div>
  );
};

export default Header;
