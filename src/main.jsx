import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreateTrip from './components/create-trip/index.jsx'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'sonner'
import Viewtrip from './components/view-trip/[tripId]/index.jsx'
import Mytrips from './my-trips/index.jsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  },
  {
    path:'my-trips',
    element:<Mytrips/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Toaster/>
        <RouterProvider router={router}/>
      </GoogleOAuthProvider>;
  </React.StrictMode>,
)
