import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Leva} from "leva"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Leva 3d Helper */}
    <Leva/>
    <App />
  </React.StrictMode>,
)
