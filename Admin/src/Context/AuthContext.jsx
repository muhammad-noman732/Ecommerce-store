import React, { createContext } from 'react'

export const authDataContext=createContext()

function AuthContext({children}) {

    let serverUrl="http://localhost:7500"

   let value={
    serverUrl

   }

  return (
    <authDataContext.Provider value={value}>
        {children}
    </authDataContext.Provider>
  )
}

export default AuthContext