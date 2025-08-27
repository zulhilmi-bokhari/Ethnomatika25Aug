import React from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'  // ❌ asal guna BrowserRouter
import { HashRouter } from 'react-router-dom'       // ✅ tukar ke HashRouter untuk GitHub Pages
import App from './App.jsx'
import './assets/styles/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/Ethnomatika25Aug">   // ❌ remove sebab BrowserRouter tak stable untuk GH Pages */}
    <HashRouter>                                     {/* ✅ HashRouter lebih selamat, elak 404 bila refresh */}
      <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
)
