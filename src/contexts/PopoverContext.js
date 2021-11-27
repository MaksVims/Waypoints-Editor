import React, {useCallback, useContext, useState} from 'react';
import {Popover, Typography} from "@mui/material";


const PopoverContextContainer = React.createContext({})

export function usePopover() {
  return useContext(PopoverContextContainer)
}

const PopoverContext = ({children}) => {
  const [isShow, setShow] = useState(false)
  const [options, setOptions] = useState(() => ({anchorEl: null, text: ''}))

  const showPopover = useCallback((event, text) => {
    setOptions(options => (
      {...options, text, anchorEl: event.domEvent.path[0]}
    ))
    setShow(true)
  }, [setShow, setOptions])

  const hidePopover = useCallback(() => setShow(false), [setShow])

  return (
    <PopoverContextContainer.Provider value={{showPopover}}>
      <Popover
        open={isShow}
        onClose={hidePopover}
        anchorEl={options?.anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography sx={{p: 1, fontSize: 13}}>{options?.text}</Typography>
      </Popover>
      {children}
    </PopoverContextContainer.Provider>
  );
};

export default PopoverContext;