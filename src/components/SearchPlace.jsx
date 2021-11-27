import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import styled from "styled-components";
import {addWaypoint, setCenter} from "../store/slices";
import DropDown from "./DropDown";
import {useToggle} from "../hooks";
import {createWaypointObject} from "../helpers";

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`

const Address = styled.li`
  padding: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color .2s;

  &:hover {
    transition: background-color .2s;
    background-color: ${props => props.theme.color.light};
  }
`

const Search = styled.input`
  border: 1px solid ${({theme}) => theme.color.grey};
  padding: 7px;
  font-size: 16px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: box-shadow .2s;

  &:focus {
    border: 2px solid ${({theme}) => theme.color.primary};
    padding: 6px;
  }

  &:hover {
    transition: box-shadow .2s;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, .1);
  }
`

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

  const handleClickAddress = useCallback((address) => {
    setValue(address, false)
    setDropDownShow(false)
    clearSuggestions()
    searchRef.current?.focus()
  }, [clearSuggestions, setDropDownShow, setValue])

  const handlePressEnterSearch = useCallback(async (e) => {
    if (e.code === 'Enter') {
      const address = e.target.value
      try {
        // Адрес преобразуем в геокод и обновляем redux
        const results = await getGeocode({address})
        const {lat, lng} = await getLatLng(results[0])
        dispatch(addWaypoint(createWaypointObject({data: results[0], lng, lat})))
        dispatch(setCenter({lat, lng}))
        setValue('')
      } catch (e) {
        alert(e.message)
      }
    }
  }, [dispatch, setValue])

  const handleFocusSearch = useCallback(() => suggestions.data.length ?
      setDropDownShow(true) :
      null,
    [suggestions, setDropDownShow])

  const handleChangeSearch = useCallback((e) => setValue(e.target.value), [setValue])

  const closeDropDown = useCallback(() => setDropDownShow(false), [setDropDownShow])

  return (
    <SearchContainer>
      <Search
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
          <Address
            key={address.place_id}
            onClick={() => handleClickAddress(address.description)}
          >
            {address.description}
          </Address>
        ))}
      </DropDown>
    </SearchContainer>
  );
};

export default SearchPlace;