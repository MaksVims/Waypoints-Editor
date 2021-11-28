import {renderHook} from "@testing-library/react-hooks";
import {useCurrentLocation} from "./useCurrentLocation";


describe(">>> HOOK --- USE_CURRENT_LOCATION", function () {
  let callback

  beforeEach(() => {
    callback = jest.fn()
  })

  it('+++ should hook return correct value', async function () {
    const {result} = renderHook(() => useCurrentLocation(callback))

    expect(result.current[0]).toBe(null)
    expect(result.current[1]).toBe(true)
  });

  it('+++ should equal snapshot', function () {
    const result = renderHook(() => useCurrentLocation(callback))
    expect(result).toMatchSnapshot()
  });

})