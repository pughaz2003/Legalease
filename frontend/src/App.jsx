import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import ProBonoRegistration from './Probono'
import LocationPicker from './LocationPicker'
import Profile from './Profile'


 



function App() {
  return (
    
     
      <Routes>
        
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/pro" element={<ProBonoRegistration />} />
        <Route path="/loc" element={<LocationPicker />} />
        <Route path="/profile" element={<Profile />} />
       

        
        
        
      
      
      </Routes>
     
      
    
  )
}

export default App
