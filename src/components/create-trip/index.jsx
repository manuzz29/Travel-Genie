import React, { useState ,useEffect} from 'react';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options'
import { toast } from 'sonner';
import { chatSession } from '../service/AIMODAL';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {doc,setDoc} from 'firebase/firestore';
import {db} from '../service/Firebaseconfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Header from '../custom/Header';


function CreateTrip() {
   const [place,setPlace]=useState();


   const[formData,setFormData]=useState([]);

   const[openDailog,setOpenDailog]=useState(false);

   const navigate=useNavigate();

   const[loading,setLoading]=useState(false);


   useEffect(()=>{
    // console.log(formData);
  },[ formData])



   const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
   }
   
   const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      // console.log(codeResp);
      GetUserProfile(codeResp);  // Assuming codeResp contains the access_token
    },
    onError: (error) => console.log(error),
  });
  

   const OnGenerateTrip=async()=>{

    const user=localStorage.getItem('user');

    if(!user)
    {
      setOpenDailog(true)
      return ;
    }

    if(formData?.noOfDays>5 &&!formData?.destination?.label||!formData?.budget||!formData?.Company)
    {
      toast("Please fill all the details")
      return;
    }
    setLoading(true);
     const FINAL_PROMPT=AI_PROMPT
     .replace('{destination}',formData?.destination?.label)
     .replace('{totalDays}',formData?.days)
     .replace('{Company}',formData?.Company)
     .replace('{budget}',formData?.budget)
     .replace('{totalDays}',formData?.days)

    //  console.log(FINAL_PROMPT);

     const result=await chatSession.sendMessage(FINAL_PROMPT);

    //  console.log("--",result?.response?.text());
     SaveAiTrip(result?.response?.text())
     setLoading(false); 
   }
    
   const SaveAiTrip=async(TripData)=>{
    setLoading(true);
      const user=JSON.parse(localStorage.getItem('user'));
      const docId=Date.now().toString();

      await setDoc(doc(db,"AITrips",docId),{
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
      });
      setLoading(false);
      navigate('/view-trip/'+docId)

   }

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
      OnGenerateTrip();
    })
   }

  return (
    <>
     <Header/>



    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-20 ml-[300px]'>
      <h2 className='font-bold text-3xl text-orange-500'>Tell us your Travel Preferences 🏕️</h2>
      <p className='mt-3 text-gray-500 text-lg'>Just Provide some details,to plan a perfect itinerary</p>

      <div className='mt-9 flex flex-col gap-7'>
        <div>
          <div className='w-9/12 border-gray-500'>
          <h2 className='text-xl my-3 font-medium'>Enter your Destination</h2>
          <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          selectProps={{
            place,
            onChange:(v) =>{ setPlace(v); handleInputChange('destination',v)}
          }}
          />
          </div>
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'> How many days are you planning your trip?</h2>
          <input placeholder='Ex.3' type='number' className='shadow-sm w-9/12 h-9 border border-[#808080] px-4 py-2 rounded' value={formData.days}  onChange={(e) => handleInputChange('days', e.target.value)}/>
        </div>
        <div className='w-9/12'>
      <h2 className='text-xl my-3 font-medium'> What is your Budget?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item,index)=>(
          <div key={index} onClick={()=> handleInputChange('budget',item.title)}
           className={`p-4 border cursor-pointer rounded-lg hover:shadow-md
            ${formData?.budget==item.title && 'shadow-lg border-black'}
           `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg mt-2'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))} 
      </div>
      </div>

      <div className='w-9/12 mb-5'>
      <h2 className='text-xl my-3 font-medium'> Who are you going with?</h2>
      <div className='grid grid-cols-4 gap-5 mt-5'>
        {SelectTravelesList.map((item,index)=>(
          <div key={index} onClick={()=> handleInputChange('Company',item.title)} 
          className={`p-4 border cursor-pointer rounded-lg hover:shadow-md 
            ${formData?.Company==item.title && 'shadow-lg border-black'}
          `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg mt-2'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
          </div>
        ))} 
      </div>
      </div>

      </div>
        <div className='bg-orange-500 mt-6 justify-end ml-80 mb-10 px-4 py-2 rounded w-36'>
            <button  disabled={loading} className='font-semibold text-center'onClick={OnGenerateTrip}>
            {loading?<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:
            'Generate Plan' }
            </button>
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
    </>
  )

}

export default CreateTrip