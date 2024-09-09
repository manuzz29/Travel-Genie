import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import {doc,getDoc,setDoc} from 'firebase/firestore';
import { db } from '@/components/service/Firebaseconfig';
import Infosection from '../components/Infosection';
import Hotels from '../components/Hotels';
import PlacestoVisit from '../components/PlacestoVisit';
import Header from '@/components/custom/Header';
// import Footer from '../components/Footer';

function Viewtrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);

    useEffect(()=>{
       tripId&&GetTripData();
    },[tripId])

    /** Used to get Trip Data from Firebase */

    const data = {
        name: "John Doe",
        age: 25,
        email: "john.doe@example.com",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001"
        },
        isActive: true
      };
      


    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            // console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            // console.log("No such Document ");
            toast('No Trip found!')
        }
    }

  return (
    <>
    <Header/>
    <div className='p-10 md:px-20 lg:px-44 xl:px-56 mt-20'>
        <Infosection trip={trip}/>
        <Hotels trip={trip}/>
        <PlacestoVisit trip={trip}/>
    </div>
    </>
  )
}

export default Viewtrip