import React from 'react'
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[46px] text-center mt-28'>
            <span className='text-[#FFA500]'>Plan Your Perfect Getaway with AI Precision</span> Personalized itineraries at your fingertips</h1>
        <p className='text-xl text-center'>Your Personal trip panner and travel curator,creating custom itineraries tailored to your interests and budget</p>
        <Link to={'/create-trip'}>
        <button className='bg-black text-[#FFA500] font-semibold px-4 py-2 rounded '>Start Planning 🏝️</button>
        </Link>

        <div className='flex gap-8 mt-12 '>
        <div className='border rounded-lg p-4 bg-orange-500 shadow-md hover:scale-105 transition-all cursor-pointer'>
          <h3 className='font-bold text-xl mb-2 text-white text-center'>Custom Itineraries</h3>
          <p className='text-white'>Get personalized travel plans designed specifically for your preferences and budget.
          Our advanced AI technology crafts personalized travel plans tailored specifically to your interests, preferences, and budget. 
            Whether you're seeking a relaxing beach vacation, an adventurous mountain trek, or a cultural city tour, we design itineraries 
            that ensure a memorable and unique travel experience.
          </p>
        </div>
        <div className='border rounded-lg p-4 shadow-md hover:scale-105 transition-all cursor-pointer'>
          <h3 className='font-bold text-xl mb-2  text-orange-500 text-center'>Travel Curator</h3>
          <p className='text-orange-500'>Our AI-powered tool curates the best travel experiences, ensuring a memorable trip.
          With our intuitive platform, you can easily explore different travel ideas, compare options, and finalize your travel plans with 
          confidence. Enjoy a seamless planning experience with tailored recommendations that ensure every moment of your trip is unforgettable.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero