import { GetPlaceDetails, PHOTO_REF_URL } from '@/components/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {

    const [photoUrl,setPhotoUrl]=useState();

    useEffect(()=>{
    hotel&&GetPlacePhoto();
    },[hotel])
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:hotel?.HotelName
          
        }
        // console.log(hotel?.HotelName);
        const result=await GetPlaceDetails(data);
        // console.log(result.data.places[0].photos[5].name);
    
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[5].name)
        setPhotoUrl(PhotoUrl);
      }

  return (
    <div>
         <Link 
      to={'https://www.google.com/maps/search/?api=1&query=' +hotel?.HotelName+","+ hotel?.HotelAddress} 
      target="_blank" 
      rel="noopener noreferrer"
      >
      <div className='hover:scale-110 transition-all cursor-pointer'>
        <img src={photoUrl?photoUrl:'/Placeholder 1.jpg'} className='rounded-xl h-[200Px] w-[300Px]' alt='Hotel Placeholder'></img>
        <div className='my-2 flex flex-col gap-2'>
          <h2 className='font-medium text-sm'>{hotel?.HotelName}</h2>
          <h2 className='text-xs text-gray-500 '>📍 {hotel?.HotelAddress}</h2>
          <h2 className='font-medium text-sm'>{hotel?.Price}</h2>
          <h2 className='text-xs text-gray-700'>⭐ {hotel?.Rating}</h2>  
        </div>
      </div>
    </Link>

    </div>
  )
}

export default HotelCardItem