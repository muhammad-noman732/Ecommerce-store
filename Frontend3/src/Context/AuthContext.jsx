import React, { createContext, useMemo } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {


  const envServerUrl = (import.meta?.env?.VITE_API_BASE_URL || '').trim()
  const fallbackServerUrl = 'http://localhost:7500'
  const normalizedServerUrl = (envServerUrl || fallbackServerUrl).replace(/\/+$/, '')

    const value = useMemo(() => ({
        serverUrl: normalizedServerUrl
    }), [normalizedServerUrl])

  return (
    <div>

        <authDataContext.Provider value={value}>

           {children}

        </authDataContext.Provider>

    </div>
  )
}

export default AuthContext