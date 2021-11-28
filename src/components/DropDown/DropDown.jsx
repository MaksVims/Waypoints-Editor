import React, {useCallback, useEffect} from 'react';
import classes from './style.module.scss'
import cn from 'classnames'

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

  const dropDownClass = cn({
    [classes.dropdown]: true,
    [classes.show]: show
  })

  return (
    <ul className={dropDownClass} onClick={handlerClick}>
      {children}
    </ul>
  );
};

export default React.memo(DropDown);