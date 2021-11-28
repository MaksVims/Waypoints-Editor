import React, {useCallback, useEffect, useRef} from 'react';
import {GoogleMap, Marker} from "@react-google-maps/api";
import {useDispatch, useSelector} from "react-redux";
import {updateWaypoint} from "../../store/slices";
import {getGeocode} from "use-places-autocomplete";
import {usePopover} from "../../contexts";
import {createRoutePath, createWaypointObject} from "../../helpers";
import classes from './style.module.scss'

const containerStyle = {
  width: '100%',
  height: '100%'
};

function Map() {
  const currentCenter = useSelector(state => state.waypoints.currentCenter)
  const waypoints = useSelector(state => state.waypoints.waypoints)
  const draggablePointIdRef = useRef(null)
  const routePathRef = useRef(null)
  const mapRef = useRef()
  const dispatch = useDispatch()
  const {showPopover} = usePopover()

  const loadMap = useCallback((map) => {
    mapRef.current = map
  }, [])


  useEffect(() => {
    if (mapRef.current) {
      // удаляем старый маршрут если есть
      if (routePathRef.current) routePathRef.current.setMap(null)

      // рисуем маршрут
      const route = waypoints.map(point => point.coords)
      routePathRef.current = createRoutePath(route)
      routePathRef.current.setMap(mapRef.current)
    }
  }, [waypoints])


  // Обработка drag & drop маркеров на карте
  const dragStart = useCallback((e, pointId) => draggablePointIdRef.current = pointId, [])

  const dragEnd = useCallback(async (e) => {
    if (draggablePointIdRef.current) {
      const lng = e.latLng.lng()
      const lat = e.latLng.lat()
      const results = await getGeocode({location: {lat, lng}})
      dispatch(updateWaypoint(
        createWaypointObject({data: results[1], lng, lat, id: draggablePointIdRef.current})
      ))
      draggablePointIdRef.current = null
    }
  }, [dispatch])

  return (
    <section className={classes.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={10}
        onLoad={loadMap}
      >
        {waypoints?.map(point => (
          <Marker
            key={point.id}
            position={point.coords}
            draggable={true}
            zIndex={100}
            onDragStart={(e) => dragStart(e, point.id)}
            onDragEnd={dragEnd}
            onClick={(e) => showPopover(e, point.geo.address)}
          />
        ))}
      </GoogleMap>
    </section>
  )
}

export default React.memo(Map)