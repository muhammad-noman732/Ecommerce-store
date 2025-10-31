import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import AdminContext from './Context/AdminContext.jsx'
import ProductContext from './Context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <AuthContext>
      <AdminContext>
        <ProductContext>
      
        <App />
        </ProductContext>
       </AdminContext>
    </AuthContext>
    </BrowserRouter>
  
)
