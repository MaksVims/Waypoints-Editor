import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {addWaypoint, setCenter} from "../../store/slices";
import {useToggle} from "../../hooks";
import {createWaypointObject} from "../../helpers";
import classes from './style.module.scss'
import {DropDown} from '../DropDown';

const SearchPlace = () => {
  const dispatch = useDispatch()
  const searchRef = useRef()
  const [isDropDownShow, setDropDownShow] = useToggle(false)
  const {clearSuggestions, setValue, value, ready, suggestions} = usePlacesAutocomplete({
    debounce: 300,
  })

  useEffect(() => {
    // Чек на количество найденных элементов
    if (suggestions.data.length) return setDropDownShow(true)

    setDropDownShow(false)

  }, [value, setDropDownShow, suggestions])

  const handleClickAddress = useCallback(address => {
    setValue(address, false)
    setDropDownShow(false)
    clearSuggestions()
    searchRef.current?.focus()
  }, [clearSuggestions, setDropDownShow, setValue])

  const handlePressEnterSearch = useCallback(async e => {
    if (e.code === 'Enter') {
      const address = e.target.value
      try {
        // Адрес преобразуем в геокод и обновляем redux
        const results = await getGeocode({address})
        const {lat, lng} = await getLatLng(results[0])
        const waypoint = createWaypointObject({
          data: results[0],
          lng,
          lat
        })

        dispatch(addWaypoint(waypoint))
        dispatch(setCenter({lat, lng}))
        setValue('')
      } catch (e) {
        alert(e.message)
      }
    }
  }, [dispatch, setValue])

  const handleFocusSearch = useCallback(() =>
      suggestions.data.length ?
      setDropDownShow(true) :
      null,
    [suggestions, setDropDownShow])

  const handleChangeSearch = useCallback(e => setValue(e.target.value), [setValue])

  const closeDropDown = useCallback(() => setDropDownShow(false), [setDropDownShow])

  return (
    <div className={classes.container}>
      <input
        className={classes.search}
        ref={searchRef}
        onKeyDown={handlePressEnterSearch}
        value={value}
        onChange={handleChangeSearch}
        disabled={!ready}
        placeholder="Создать новую точку маршрута"
        onFocus={handleFocusSearch}
        onClick={e => e.preventDefault()}
      />
      <DropDown
        show={isDropDownShow}
        close={closeDropDown}
      >
        {suggestions?.data?.map(address => (
          <li
            className={classes.address}
            key={address.place_id}
            onClick={() => handleClickAddress(address.description)}
          >
            {address.description}
          </li>
        ))}
      </DropDown>
    </div>
  );
};

export default React.memo(SearchPlace);