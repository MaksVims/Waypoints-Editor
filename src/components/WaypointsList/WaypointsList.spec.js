import {configureStore} from "@reduxjs/toolkit";
import {addWaypoint, waypointsReducer} from "../../store/slices";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import WaypointsList from "./WaypointsList";

describe(">>> C O M P O N E N T --- WaypointsList", function () {
  let store
  const waypoints = [
    {id: 1, geo: {address: 'lorem'}, coords: {lat: 0, lng: 1}},
    {id: 2, geo: {address: 'lorem1'}, coords: {lat: 3, lng: 4}},
    {id: 3, geo: {address: 'lorem2'}, coords: {lat: 5, lng: 4}},
    {id: 4, geo: {address: 'lorem3'}, coords: {lat: 1, lng: 3}},
  ]

  beforeEach(() => {
    store = configureStore({
      reducer: {'waypoints': waypointsReducer}
    })
  })

  it('+++ should correct render component', function () {
    render(<Provider store={store}><WaypointsList/></Provider>)
    expect(screen.queryByText('lorem')).toBeNull()
    expect(screen.getByRole('list')).toBeInTheDocument()

  });

  it('+++ should update view after added waypoints in redux', function () {
    const {rerender} = render(<Provider store={store}><WaypointsList/></Provider>)
    waypoints.forEach(point => store.dispatch(addWaypoint(point)))

    rerender(<Provider store={store}><WaypointsList/></Provider>)

    expect(screen.getByText('lorem')).toBeInTheDocument()
  });

  it('+++ should equal snapshot', function () {
    const result = render(<Provider store={store}><WaypointsList/></Provider>)
    expect(result).toMatchSnapshot()
  });
})