import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { atomWithDefault, useAtomValue } from "jotai/utils"

const fetchCurrentCountry = async () => {
  try {
    const rawResponse = await fetch("https://extreme-ip-lookup.com/json/")
    return (await rawResponse.json()).country
  }
  catch (error) {
    return null
  }
}

const currentCountryState = atomWithDefault<string>(() => fetchCurrentCountry())

function App() {
  const [showLocation, setShowLocation] = useState<boolean>(false)

  function Intro() {
    return (
      <div>
        <p>Henlo!</p>
        <p>
          <button onClick={() => setShowLocation(true)}>Where am I?</button>
        </p>
      </div>
    )
  }

  function Location() {

    const country = useAtomValue(currentCountryState)

    return (
      <div>
        <h1>{country}</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          showLocation ? <Location /> : <Intro />
        }
      </header>
    </div>
  )
}

export default App

