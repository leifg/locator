import React from "react"

import { atomWithDefault, useAtomValue } from "jotai/utils"
import { atom } from "jotai"

const fetchEntities = async () => {
  const rawResponse = await fetch("https://backend.filmswipe.io/core/countries")
  return rawResponse.json()
}

const fetchCurrentCountryCode = async () => {

  try {
    const rawResponse = await fetch("https://lumtest.com/myip.json")
    return (await rawResponse.json()).countryCode
  }
  catch (error) {
    return null
  }
}

const selectedCountryState = atomWithDefault((get) => get(defaultCountryState))

const defaultCountryState = atom(async (get) => {
  const allCountries = get(availableCountriesState)
  const currentLocation = get(currentCountryCode)

  return allCountries.find(({id} : {id : string}) => id == currentLocation) || {id: "US", name: "United States"}
})

const availableCountriesState = atom((get) => get(availableCountriesStateApi))

const availableCountriesStateApi = atom(async () => fetchEntities())

const currentCountryCode = atom<string>(() => fetchCurrentCountryCode())

const WatchProviderSelection : React.FC = () => {
  const selectedCountry = useAtomValue(selectedCountryState)

  return (<div>
    <h1>{selectedCountry.name}</h1>
  </div>)
}

WatchProviderSelection.displayName = "WatchProviderSelection"
export default WatchProviderSelection
