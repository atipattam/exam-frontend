import React from "react"
import backgroundImage from "./assets/images/bg.jpg"
import logo from "./assets/images/logo.png"
import FirstSection from "./pages/FirstSection"

const App = () => {
  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="logo-wrapper">
        <img src={logo}></img>
      </div>
      <div className="container">
        <FirstSection />
      </div>
    </div>
  )
}

export default App
