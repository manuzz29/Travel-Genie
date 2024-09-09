import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";


function Header() {

  const user=JSON.parse(localStorage.getItem('user'));

  const[openDailog,setOpenDailog]=useState(false);


  useEffect(()=>{
    // console.log(user)
  },[])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      // console.log(codeResp);
      GetUserProfile(codeResp);  // Assuming codeResp contains the access_token
    },
    onError: (error) => console.log(error),
  });

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
       Authorization:`Bearer ${tokenInfo?.access_token}`,
       Accept:'Application/json'
      }
    }).then((resp)=>{
      // console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload();
    })
   }

  return (
    <header className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
    <div className='p-2 shadow-sm flex justify-between items-center '>
    <div className='flex items-center gap-3 ml-3'>
          <img src='/logo.svg' alt='TravelGenie Logo' className='w-9 h-9' />
          <Link to='/'>
            <span className='text-2xl font-bold text-gray-800'>TravelGenie</span>
          </Link>
        </div>
        <div>
          {user?
              <div className='flex items-center gap-5 mr-3'>
                 <a href='/create-trip' ><button className='rounded-full border border-black h-8 w-32 hover:bg-black hover:border-none hover:text-white transition duration-300'> + create trip </button></a>
               <a href='/my-trips' ><button className='rounded-full border border-black h-7 w-20 hover:bg-amber-600 hover:border-none hover:text-white transition duration-300'> My Trips </button></a>
               {/* <img src={user?.picture || '/Placeholder 1.jpg'} className='h-[35px] w-[35px] rounded-full'/> */}
               <Popover>
                 <PopoverTrigger>
                 <img src={user?.picture || '/Placeholder 1.jpg'} className='h-[35px] w-[35px] rounded-full'/>
                 </PopoverTrigger>
                 <PopoverContent>
                  <h2 className='cursor-pointer'
                  onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  >Logout</h2>
                 </PopoverContent>
               </Popover>

              </div>
              :
          <button onClick={()=>setOpenDailog(true)}className='bg-orange-500 text-white px-4 py-2 rounded'>Sign in </button>
          }
        </div>
        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg"/>
                <h2 className='font-bold text-lg mt-3 text-black'>  Sign in with Google</h2>
                <p className='text-gray-700'>Sign in to the App with Google Authentication security</p>

                <button onClick={login}
                className='w-full h-11 mt-5 bg-black text-white font-semibold text-base shadow-xl rounded flex gap-4 justify-center items-center hover:shadow-md'>
                  <FcGoogle  className='h-7 w-7'/>
                  Sign in with Google </button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
    </header>
  )
}

export default Header
