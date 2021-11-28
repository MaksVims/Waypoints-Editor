import {v4} from "uuid";

export function createWaypointObject({data, lng, lat, id = null}) {
  return {
    id: id ? id : v4(),
    coords: {lat, lng},
    geo: {
      address: data.formatted_address,
      place_id: data.place_id
    }
  }
}

export function createRoutePath(route) {
  if (!route) return null
  const google = window.google
  if (google?.maps?.Polyline) {
    return new google.maps.Polyline({
      path: route,
      geodesic: true,
      strokeColor: '#0244e1',
      strokeOpacity: 1.0,
      strokeWeight: 2
    })
  }
}