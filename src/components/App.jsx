import React, {useCallback} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setCenter} from "../store/slices";
import {useCurrentLocation} from "../hooks";
import SearchPlace from "./SearchPlace";
import WaypointsList from "./WaypointsList";
import Map from "./Map";
import Loader from "./Loader";

const SiteContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  overflow-x: hidden;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${props => props.theme.media.middle}) {
    padding: 20px 10px;
  }
`
const Container = styled.main`
  width: 100%;
  height: 100%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`
const Panel = styled.div`
  width: 40%;

  @media (max-width: ${props => props.theme.media.large}) {
    width: 35%;
  }

  @media (max-width: ${props => props.theme.media.middle}) {
    width: 38%;
  }

  @media (max-width: ${props => props.theme.media.small}) {
    width: 48%;
  }
`
const Title = styled.h1`
  text-align: center;
  margin-bottom: 45px;
  @media (max-width: ${props => props.theme.media.small}) {
    font-size: 21px;
    margin-bottom: 30px;
  }
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`

const App = () => {
  const dispatch = useDispatch()
  // Находим геопозицию пользователя
  const [initialLocation, loading] = useCurrentLocation(useCallback((position) => {
    dispatch(setCenter({lat: position.coords.latitude, lng: position.coords.longitude}))
  }, [dispatch]))

  if (loading) return <Loader loading={loading} color={"blue"} size={150}/>

  return (
    <SiteContainer>
      <Container>
        <Title>Редактор маршрутов</Title>
        <Wrapper>
          <Panel>
            <SearchPlace/>
            <WaypointsList/>
          </Panel>
          <Map/>
        </Wrapper>
      </Container>
    </SiteContainer>
  );
};

export default App;