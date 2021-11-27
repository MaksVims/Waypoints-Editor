import {useEffect, useState} from "react";

export function useCurrentLocation(callback) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      callback(position)
      setData(position)
      setLoading(false)
    })
  }, [])

  return [data, loading]
}