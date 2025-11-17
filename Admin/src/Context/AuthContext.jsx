import React, { createContext } from 'react'

export const authDataContext = createContext()

function AuthContext({children}) {

  // Read environment variable (must be set in production)
  const envServerUrl = (import.meta?.env?.VITE_API_BASE_URL || '').trim()

  // Check environment
  const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development'

  // Development fallback only
  const devFallback = 'http://localhost:7500'

  // Production safety check
  if (!isDevelopment && !envServerUrl) {
    throw new Error(
      '❌ ERROR: VITE_API_BASE_URL is missing in production. Set it in Coolify before building.'
    )
  }

  // Select final URL
  const finalServerUrl = isDevelopment
    ? envServerUrl || devFallback // dev: use env OR fallback
    : envServerUrl // prod: must use env only

  // Normalize trailing slashes
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