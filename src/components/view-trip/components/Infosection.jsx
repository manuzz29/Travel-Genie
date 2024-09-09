import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import {GetPlaceDetails} from '@/components/service/GlobalApi';
import {PHOTO_REF_URL} from '@/components/service/GlobalApi';


function Infosection({trip}) {

  const [photoUrl,setPhotoUrl]=useState();

useEffect(()=>{
trip&&GetPlacePhoto();
},[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.destination?.label
      
    }
    // console.log(trip?.userSelection?.destination?.label);
    const result=await GetPlaceDetails(data);
    // console.log(result.data.places[0].photos[5].name);

    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[5].name)
    setPhotoUrl(PhotoUrl);
  }
  return (
    <div className='ml-16 mr-0'>
      <img src={photoUrl?photoUrl:'/Placeholder 1.jpg'} className='h-[340px] w-11/12 object-cover rounded-lg'/>
      <div className='flex justify-between items-center'>
      <div className='mt-5 mb-5 flex flex-col gap-2'>
        <h2 className='font-bold text-xl'>{trip?.userSelection?.destination?.label}</h2>
        <div className='flex flex-row gap-5'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'> 📅 {trip.userSelection?.days}Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰 {trip.userSelection?.budget}Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>👥 {trip.userSelection?.Company}</h2>
        </div>
      </div>
      <button className='bg-black w-14 h-8 rounded-md mr-24'><IoIosSend className='text-white h-6 w-6 ml-3' /></button>
    </div>
    </div>
  )
}

export default Infosection