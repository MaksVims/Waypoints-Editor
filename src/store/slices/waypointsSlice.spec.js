import {addWaypoint, removeWaypoint, reorderedWaypoint, setCenter, updateWaypoint, waypointsReducer} from "./index";
import {configureStore} from "@reduxjs/toolkit";


describe(">>>R E D U C E R --- Test Waypoints Reducer", function () {
  const waypoints = [
    {id: 1, address: 'lorem'},
    {id: 2, address: 'lorem1'},
    {id: 3, address: 'lorem2'},
    {id: 4, address: 'lorem3'},
  ]
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        'w': waypointsReducer
      }
    })
  })

  it('+++ reducer for ADD_WAYPOINTS', function () {
    store.dispatch(addWaypoint(waypoints[0]))
    expect(store.getState().w.waypoints[0]).toEqual(waypoints[0])
  });

  it('+++ reducer for REMOVE_WAYPOINT', function () {
    waypoints.forEach(point => store.dispatch(addWaypoint(point)))
    store.dispatch(removeWaypoint(waypoints[1].id))
    expect(store.getState().w.waypoints.indexOf(waypoints[1])).toBe(-1)
  });

  it('+++ reducer for UPDATE_WAYPOINT', function () {
    const upd = {id: 1, address: 'upd'}
    waypoints.forEach(point => store.dispatch(addWaypoint(point)))
    store.dispatch(updateWaypoint(upd))
    expect(store.getState().w.waypoints[0]).toEqual(upd)
  });

  it('+++ reducer for REORDERED_WAYPOINT', function () {
    waypoints.forEach(point => store.dispatch(addWaypoint(point)))
    store.dispatch(reorderedWaypoint({from: waypoints.length - 1, to: 0}))
    expect(store.getState().w.waypoints[0]).toEqual(waypoints[waypoints.length - 1])
  });

  it('++ reducer for SET_CENTER', function () {
    const center = {lat: 5, lng: 10}
    store.dispatch(setCenter(center))
    expect(store.getState().w.currentCenter).toEqual(center)
  });
})