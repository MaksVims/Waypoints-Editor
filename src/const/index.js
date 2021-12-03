export const GOOGLE_API_KEY = 'AIzaSyBonvH3Y1Y_iIH1fHmvjxsbNH3nCTWQeY8'
export const libraries = ["places"]

export const CONTAINER_STYLE = {
  width: '100%',
  height: '100%'
};

export const mockWaypoint = {
  id: 1,
  geo: {
    address: "lorem",
    place_id: 21
  },
  coords: {
    lat: 12,
    lng: 2
  }
}

export const mockWaypoints = [
  {id: 1, geo: {address: 'lorem', place_id: 1}, coords: {lat: 0, lng: 1}},
  {id: 2, geo: {address: 'lorem1', place_id: 12}, coords: {lat: 3, lng: 4}},
  {id: 3, geo: {address: 'lorem2', place_id: 13}, coords: {lat: 5, lng: 4}},
  {id: 4, geo: {address: 'lorem3', place_id: 14}, coords: {lat: 1, lng: 3}},
]