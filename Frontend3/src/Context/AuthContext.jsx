import React, { Children, createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {


  const serverUrl="http://localhost:7500"

    let value={
        serverUrl
    }

  return (
    <div>

        <authDataContext.Provider value={value}>

           {children}

        </authDataContext.Provider>

    </div>
  )
}

export default AuthContext