import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {LoadScript} from "@react-google-maps/api";
import {store} from "./store";
import {PopoverContext} from "./contexts";
import {ThemeProvider} from "styled-components";
import {theme} from "./theme";
import App from "./components/App";
import {GOOGLE_API_KEY, libraries} from "./const";


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
        <PopoverContext>
          <App/>
        </PopoverContext>
      </LoadScript>
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);


