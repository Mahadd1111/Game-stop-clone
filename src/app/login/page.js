"use client"
import Image from "next/image"
import { useState } from "react"
import { signIn, useSession, signOut } from 'next-auth/react';
import Link from "next/link";

const Login = () => {

    const { data: session } = useSession();
    const [uname,setUname]=useState("")
    const [pword,setPword]=useState("")

    function handleInputChange(e,input){
        if(input=="U"){
            setUname(e.target.value)
        }
        else{
            setPword(e.target.value)
        }
    }

    async function loginWithCredentials(){
        try{
            await signIn('credentials',{
                username:uname,
                password:pword,
                redirect:true,
                callbackUrl:"/admin"
            })
        }catch(error){
            console.log('Error Logging In: ',error)
        }
    }


    return (
        <div className="lg:px-40 py-20 h-screen mt-5 bg-black flex items-center justify-center">
            <div className="mt-10 bg-slate-700 rounded-2xl lg:w-1/2 flex flex-col justify-center items-center px-8 py-3 gap-7">
                <p className="font-bold text-3xl text-white mt-5">Administrator Login</p>
                <hr className="border-white w-full" /> 
                <div className="flex flex-col gap-2 p-6 border rounded-lg shadow-lg bg-white">
                    <label htmlFor="username" className="text-gray-600">Username</label>
                    <input
                        onChange={(e)=>{handleInputChange(e,"U")}}
                        value={uname}
                        type="text"
                        id="username"
                        name="username"
                        className="border-2 border-gray-300 p-1 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter your username"
                    />

                    <label htmlFor="password" className="text-gray-600">Password</label>
                    <input
                        onChange={(e)=>{handleInputChange(e,"P")}}
                        value={pword}
                        type="password"
                        id="password"
                        name="password"
                        className="border-2 border-gray-300 p-1 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <button onClick={loginWithCredentials} className="px-8 py-3 flex items-center border-2 text-white border-white rounded-xl">Sign In With Credentials</button>
            </div>


        </div>
    )

}

export default Login