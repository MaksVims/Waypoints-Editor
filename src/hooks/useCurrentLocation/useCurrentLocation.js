import {useEffect, useState} from "react";

export function useCurrentLocation(callback) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    if (navigator?.geolocation?.getCurrentPosition) {
      navigator?.geolocation?.getCurrentPosition(position => {
        if (typeof callback === 'function') callback(position)
        setLoading(false)
        setData(position)
      })
    }
  }, [callback])

  return [data, loading]
}