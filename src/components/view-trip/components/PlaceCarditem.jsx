import { GetPlaceDetails, PHOTO_REF_URL } from '@/components/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCarditem({item}) {

  const [photoUrl,setPhotoUrl]=useState();

useEffect(()=>{
item&&GetPlacePhoto();
},[item])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:item?.PlaceName
      
    }
    // console.log(item?.PlaceName);
    const result=await GetPlaceDetails(data);
    // console.log(result.data.places[0].photos[6].name);

    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[6].name)
    setPhotoUrl(PhotoUrl);
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' +item?.PlaceName} 
        target="_blank">
    <div className='border rounded-xl p-3 mt-5 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'> 

   <img 
  src={photoUrl?photoUrl:'/Placeholder 1.jpg'}  
  className='w-[100px] h-[100px] rounded-md object-cover ' 
   />
  
  <div>
    <h2 className='font-bold text-lg'>{item?.PlaceName}</h2>
    <p className='text-sm text-gray-500'>{item?.PlaceDetails}</p>
    
    <div className='flex justify-between items-center pt-2'>
      <h2 className='font-semibold text-blue-500 text-sm'>{item?.TicketPricing}</h2>
      <h2 className='font-semibold text-sm text-orange-400'>{item?.Rating} ★</h2> 
    </div>
  </div>
</div>
</Link>

  )
}

export default PlaceCarditem