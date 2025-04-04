import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; // استيراد GoogleOAuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <BrowserRouter> 
    <GoogleOAuthProvider clientId="635219228214-pkejjdk0flhm73leii1v984m3br5raoo.apps.googleusercontent.com"> 
      <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
