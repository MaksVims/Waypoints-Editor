import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {setCenter} from "../../store/slices";
import {useCurrentLocation} from "../../hooks";
import classes from './style.module.scss'
import {Loader} from "../Loader/";
import {SearchPlace} from "../SearchPlace";
import {WaypointsList} from "../WaypointsList";
import {Map} from "../Map";


const App = () => {
  const dispatch = useDispatch()
  // Находим геопозицию пользователя
  const [, loading] = useCurrentLocation(useCallback(position=> {
    if (position) {
      dispatch(
        setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
      )
    }
  }, [dispatch]))

  if (loading) return <Loader loading={loading} color={"blue"} size={150}/>

  return (
    <div className={classes.siteWrapper}>
      <main className={classes.container}>
        <h1 className={classes.appTitle}>
          Редактор маршрутов
        </h1>
        <div className={classes.wrapper}>
          <section className={classes.panel}>
            <SearchPlace/>
            <WaypointsList/>
          </section>
          <Map/>
        </div>
      </main>
    </div>
  );
};

export default App;