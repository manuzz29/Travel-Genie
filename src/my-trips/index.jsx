import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/components/service/Firebaseconfig';
import UserTripCardItem from './components/UserTripCardItem';
import Header from '@/components/custom/Header';

function Mytrips() {

    const navigation=useNavigation();
    const[userTrips,setUserTrips]=useState([]);

    useEffect(()=>{
    GetUserTrips();
},[])

const GetUserTrips=async()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    if(!user){
        navigation('/');
        return;
    }
        setUserTrips([]);
        const trips = [];
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // setUserTrips(prevVal=>[...prevVal,doc.data()]);
        trips.push(doc.data());
        // console.log(userTrips);
});
setUserTrips(trips);

}

  return (
    <>
    <Header/>
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-20 ml-[100px] '>
         <h2 className='font-bold text-lg'>My Trips </h2>
         <div className='grid grid-cols-1 md:grid-cols-4 gap-2 mt-6'>
            {userTrips.map((trip,index)=>(
                <UserTripCardItem  key={index} trip={trip}/>
            ))}
         </div>
    </div>
    </>
  )
}

export default Mytrips