import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { atomWithDefault, useAtomValue } from "jotai/utils"
import { atom } from 'jotai'

interface Country {
  key: string,
  name: string,
}

interface Location {
  country: string
}

const fetchAllCountries = async () => {
  try {
    const rawResponse = await fetch("https://backend.filmswipe.io/core/countries")
    return await rawResponse.json()
  }
  catch (error) {
    return {country: "US"}
  }
}

const fetchCurrentLocation = async () => {
  try {
    const rawResponse = await fetch("https://lumtest.com/myip.json")
    return await rawResponse.json()
  }
  catch (error) {
    return null
  }
}

const currentCountryState = atom<Country | undefined>((get) => (get(availableCountriesState).find((country) => country.key === get(currentLocationState).country )))
const currentLocationState = atomWithDefault<Location>(() => fetchCurrentLocation())
const availableCountriesState = atom<Array<Country>>(async () => fetchAllCountries())

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

    const countryName = country ? country.name : "Not Found"

    return (
      <div>
        <h1>{countryName}</h1>
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

