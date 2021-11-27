import {configureStore} from "@reduxjs/toolkit";
import {waypointsReducer} from "./slices";

export const store = configureStore({
  reducer: {
    'waypoints': waypointsReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat()
})

