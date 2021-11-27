import React, {useCallback, useState} from "react";

export function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)

  const toggle = useCallback((updateValue) => {
    setValue(value => {
      return typeof updateValue === 'boolean' ? updateValue : !value
    })
  }, [])

  return [value, toggle]
}