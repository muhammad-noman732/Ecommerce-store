import React, { createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {
  const envServerUrl = (import.meta?.env?.VITE_API_BASE_URL || '').trim()
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development'
  const devFallback = 'http://localhost:7500'

  if (!isDevelopment && !envServerUrl) {
    throw new Error(
      'VITE_API_BASE_URL is missing in production. Set it in Coolify before building.'
    )
  }

  const finalServerUrl = isDevelopment
    ? envServerUrl || devFallback
    : envServerUrl

  const normalizedServerUrl = finalServerUrl.replace(/\/+$/, '')

  const value = {
    serverUrl: normalizedServerUrl
  }

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext