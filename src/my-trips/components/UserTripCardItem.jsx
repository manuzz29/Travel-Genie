import { GetPlaceDetails, PHOTO_REF_URL } from '@/components/service/GlobalApi';
import { LineChart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {


    const [photoUrl,setPhotoUrl]=useState();

    useEffect(()=>{
    trip&&GetPlacePhoto();
    },[trip])
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:trip?.userSelection?.destination?.label
          
        }
        const result=await GetPlaceDetails(data);
        // console.log(result.data.places[0].photos[5].name);
    
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[5].name)
        setPhotoUrl(PhotoUrl);
      }
      // console.log(trip?.userSelection?.destination?.label);

  return (
    <Link to={'/view-trip'+trip?.id}>
    <div className='hover:scale-105 transition-all hover:shadow-md'>
        <img src={photoUrl?photoUrl:'/Placeholder 1.jpg'} className='object-cover rounded-xl w-[300px] h-[200px]'/>
        <div>
            <h2 className='font-semibold text-lg pt-2 pl-1'>{trip?.userSelection?.destination?.label}</h2>
            <h2 className='font-medium pt-2 pl-1 text-gray-500'>{trip?.userSelection?.days} Days Trip - {trip?.userSelection?.Company}</h2>
            <h2 className='font-semibold pt-2 pl-1 text-orange-500'> {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem