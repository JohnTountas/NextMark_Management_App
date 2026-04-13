import { useState, useEffect } from 'react'

function detectLegacyKey(key, matcher) {
  if (typeof window === 'undefined' || typeof matcher !== 'function') {
    return null
  }

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const candidateKey = window.localStorage.key(index)

    if (candidateKey && candidateKey !== key && matcher(candidateKey)) {
      return candidateKey
    }
  }

  return null
}

export function useLocalStorage(key, initialValue, options = {}) {
  const legacyKeys = options.legacyKeys ?? []
  const [detectedLegacyKey] = useState(() =>
    detectLegacyKey(key, options.legacyKeyMatcher),
  )

  const [storedValue, setStoredValue] = useState(() => {
    try {
      for (const storageKey of [key, ...legacyKeys, detectedLegacyKey].filter(Boolean)) {
        const item = window.localStorage.getItem(storageKey)

        if (item !== null) {
          return JSON.parse(item)
        }
      }

      return initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))

      for (const legacyKey of [...legacyKeys, detectedLegacyKey].filter(Boolean)) {
        if (legacyKey !== key) {
          window.localStorage.removeItem(legacyKey)
        }
      }
    } catch {
      // ignore
    }
  }, [detectedLegacyKey, key, options.legacyKeys, storedValue])

  return [storedValue, setStoredValue]
}
