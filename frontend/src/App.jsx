import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import ProBonoRegistration from './Probono'
import LocationPicker from './LocationPicker'
import Profile from './Profile'
import Chat from './Chat'
import MessageList from './MessageList'
import SubmitCase from './SubmitCase'
import MyCases from './MyCases'


 



function App() {
  return (
    
     
      <Routes>
        
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/pro" element={<ProBonoRegistration />} />
        <Route path="/loc" element={<LocationPicker />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:lawyerId" element={<Chat />} />
         <Route path="/messages" element={<MessageList />} />
         <Route path="/submit-case/:lawyerId" element={<SubmitCase />} />
         <Route path="/my-cases" element={<MyCases />} />


       

        
        
        
      
      
      </Routes>
     
      
    
  )
}

export default App
