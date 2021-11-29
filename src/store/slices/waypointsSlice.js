import {createSlice} from "@reduxjs/toolkit";

const waypointsSlice = createSlice({
  name: 'waypoints',

  initialState: {
    waypoints: [],
    currentCenter: {lat: 0, lng: 0}
  },

  reducers: {
    addWaypoint: ((state, action) => {
      state.waypoints.push(action.payload)
    }),

    removeWaypoint: (state, action) => {
      state.waypoints = state.waypoints.filter(point => point.id !== action.payload)
    },

    updateWaypoint: (state, action) => {
      state.waypoints = state.waypoints.map(point => {
        if (point.id === action.payload.id) {
          return action.payload
        }
        return point
      })
    },

    reorderedWaypoint: (state, action) => {
      // меняем порядок элементов в массиве
      const {from, to} = action.payload
      const waypoints = state.waypoints.slice()
      const [reorderWaypoint] = waypoints.splice(from, 1)
      waypoints.splice(to, 0, reorderWaypoint)
      state.waypoints = waypoints
    },

    setCenter: (state, action) => {
      state.currentCenter = action.payload
    }
  }
})

export default waypointsSlice.reducer
export const {
  addWaypoint,
  removeWaypoint,
  reorderedWaypoint,
  setCenter,
  updateWaypoint,
} = waypointsSlice.actions