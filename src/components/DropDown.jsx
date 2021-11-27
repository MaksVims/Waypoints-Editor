import React, {useCallback, useEffect} from 'react';
import styled from "styled-components";

const DropDownContainer = styled.ul`
  display: ${props => props.show ? 'block' : 'none'};
  padding: 10px 0;
  position: absolute;
  width: 100%;
  top: calc(100% + 2px);
  left: 0;
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, .7);
  z-index: ${({theme}) => theme.zIndex.dropdown};
`

const DropDown = ({children, show, close}) => {

  useEffect(() => {
    // Проверка вызова e.preventDefault() 
    const closeDropDown = (e) => {
      if (!e.defaultPrevented) close()
    }

    document.body.addEventListener('click', closeDropDown)
    return () => {
      document.body.removeEventListener('click', closeDropDown)
    }
  }, [close])
  const handlerClick = useCallback((e) => e.preventDefault(), [])

  return (
    <DropDownContainer show={show} onClick={handlerClick}>
      {children}
    </DropDownContainer>
  );
};

export default DropDown;