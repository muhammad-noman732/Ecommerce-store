import React, { createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {

  // Read API base URL from environment variables (Vite requires VITE_ prefix)
  const envServerUrl = (import.meta?.env?.VITE_API_BASE_URL || '').trim()
  // Normalize: remove trailing slashes
  const normalizedServerUrl = envServerUrl.replace(/\/+$/, '')

   let value={
    serverUrl: normalizedServerUrl

   }

  return (
    <authDataContext.Provider value={value}>
        {children}
    </authDataContext.Provider>
  )
}

export default AuthContext