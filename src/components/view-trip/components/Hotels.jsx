import { Target } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import {GetPlaceDetails} from '@/components/service/GlobalApi';
import HotelCardItem from './HotelCardItem';

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=2000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


function Hotels({trip}) {
  const [photoUrl,setPhotoUrl]=useState();

  useEffect(()=>{
  trip&&GetPlacePhoto();
  },[trip])
  
    const GetPlacePhoto=async()=>{
      const data={
        textQuery:trip?.tripData?.
        hotel_options?.HotelName
      }
      // console.log(trip?.tripData?.hotel_options );
      const result=await GetPlaceDetails(data);
      // console.log(result.data.places[0].photos[5].name);
  
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[5].name)
      setPhotoUrl(PhotoUrl);
    }
  return (
    <div className='ml-16'>

        <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-3 gap-7'>
      {trip?.tripData?.hotel_options?.map((hotel, index) => (
    <HotelCardItem hotel={hotel}/>  
  ))}
   </div>


    </div>
  )
}

export default Hotels