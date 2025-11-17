import React, { createContext, useMemo } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {


  // Read API base URL from environment variables (Vite requires VITE_ prefix)
  const envServerUrl = (import.meta?.env?.VITE_API_BASE_URL || '').trim()
  // Normalize: remove trailing slashes
  const normalizedServerUrl = envServerUrl.replace(/\/+$/, '')

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