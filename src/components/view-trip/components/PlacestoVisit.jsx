import React from 'react'
import PlaceCarditem from './PlaceCarditem'

function PlacestoVisit({trip}) {
  return (
    <div className='ml-16'>
        <h2 className='font-bold mt-5 text-xl'>Places to Visit</h2>
        <div className='grid md:grid-cols-2 gap-4'> 
            {trip?.tripData?.itinerary?.map((item,index)=>(
           <div key={index}>
            <h2 className='font-medium text-lg'>Day {item.Day}</h2>

                <div>
                    <h2 className='font-medium text-sm text-gray-400'>{item?.Time}</h2>
                    <PlaceCarditem item={item}/>
                </div>

            </div>
            ))}
        </div>
    </div>
  )
}

export default PlacestoVisit