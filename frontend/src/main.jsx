import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Navbar from './Navbar'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <Navbar/>
     <App/>
     </BrowserRouter>
    
    
  </StrictMode>,
)
