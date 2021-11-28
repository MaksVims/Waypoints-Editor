import {renderHook} from "@testing-library/react-hooks";
import {useToggle} from "./useToggle";
import {act} from "react-test-renderer";

describe(">>> HOOK --- USE_TOGGLE", function () {

  it('--- should hook return correct values', function () {
    let initValue = true
    const {result} = renderHook(() => useToggle(() => initValue))
    const [value, toggle] = result.current
    expect(value).toEqual(initValue)
    expect(typeof toggle === 'function').toBe(true)
  });

  it('--- should hook return false without init value', function () {
    const {result} = renderHook(() => useToggle())
    const [value] = result.current
    expect(value).toBe(false)
  });

  it('--- should call toggle function without args return inversion boolean value', function () {
    const {result} = renderHook(() => useToggle(false))
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)
  })

  it('--- should call toggle function with NOT BOOLEAN args return inversion current value', function () {
    const {result} = renderHook(() => useToggle(false))
    act(() => {
      result.current[1]('hello')
    })
    expect(result.current[0]).toBe(true)
  })

  it('--- should return function immutable for rerender', function () {
    const {result, rerender} = renderHook(() => useToggle(false))
    const [value, toggle] = result.current
    rerender()
    expect(toggle).toEqual(result.current[1])
  });

  it('--- equal to snapshot ', function () {
    const result = renderHook(() => useToggle(false))
    expect(result).toMatchSnapshot()
  });
})
