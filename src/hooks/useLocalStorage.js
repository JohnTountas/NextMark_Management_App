import { useState, useEffect, useMemo } from 'react'

// Persistence is centralized here so components can read/write localStorage
// through React state without duplicating serialization concerns.
function detectLegacyKey(key, matcher) {
  if (typeof window === 'undefined' || typeof matcher !== 'function') {
    return null
  }

  // Scan once for an older matching key so we can migrate forward seamlessly
  // when the storage namespace changes.
  for (let index = 0; index < window.localStorage.length; index += 1) {
    const candidateKey = window.localStorage.key(index)

    if (candidateKey && candidateKey !== key && matcher(candidateKey)) {
      return candidateKey
    }
  }

  return null
}

export function useLocalStorage(key, initialValue, options = {}) {
  const legacyKeys = useMemo(() => options.legacyKeys ?? [], [options.legacyKeys])
  // Capture the migration target during initialization; we only need to detect
  // a legacy key once per mounted hook instance.
  const [detectedLegacyKey] = useState(() =>
    detectLegacyKey(key, options.legacyKeyMatcher),
  )

  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Prefer the current key, but fall back to any legacy aliases so users
      // keep their saved state after a rename.
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

      // Once the new key has been written, remove older aliases to avoid
      // confusing future reads and manual debugging.
      for (const legacyKey of [...legacyKeys, detectedLegacyKey].filter(Boolean)) {
        if (legacyKey !== key) {
          window.localStorage.removeItem(legacyKey)
        }
      }
    } catch {
      // ignore
    }
  }, [detectedLegacyKey, key, legacyKeys, storedValue])

  return [storedValue, setStoredValue]
}
