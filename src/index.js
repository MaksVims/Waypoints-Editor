import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './styles/index.scss';
import {LoadScript} from "@react-google-maps/api";
import {store} from "./store";
import {PopoverContext} from "./contexts";
import {GOOGLE_API_KEY, libraries} from "./const";
import {App} from "./components";


ReactDOM.render(
  <Provider store={store}>
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
      <PopoverContext>
        <App/>
      </PopoverContext>
    </LoadScript>
  </Provider>
  ,
  document.getElementById('root')
);


