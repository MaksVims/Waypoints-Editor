import {createRoutePath, createWaypointObject} from "./index";

describe(">>> H E L P E R --- create waypoint object", () => {
  const correct = {id: 1, coords: {lat: 2, lng: 20}, geo: {address: 'lorem', place_id: 2}}
  const mockData = {formatted_address: 'lorem', place_id: 2}

  it('+++ should return correct object WITH ID props', function () {
    const result = createWaypointObject({data: mockData, lng: 20, lat: 2, id: 1})
    expect(result).toEqual(correct)
  });

  it('+++ should return correct object WITHOUT ID props', function () {
    const result = createWaypointObject({data: mockData, lng: 20, lat: 2})
    expect(Object.keys(result).length).toBe(3)
  });
})

describe(">>> H E L P E R --- create route path", () => {

  it('+++ should run helper', function () {
    const result = createRoutePath()
    expect(result).toBe(null)
  });
})