import {configureStore} from "@reduxjs/toolkit";
import {waypointsReducer} from "../../store/slices";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import App from "./App";
import {act} from "react-test-renderer";

describe(">>> C O M P O N E N T --- APP ", function () {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {'waypoints': waypointsReducer}
    })
  })

  it('+++ should correct initial first render ', function () {

    act(() => {
      render(
        <Provider store={store}>
          <App/>
        </Provider>
      )
    })

    expect(screen.queryByRole('textbox')).toBeNull()
    expect(screen.queryByRole('list')).toBeNull()
  });

  it('should equal to snapshot', function () {
    const result = render(
      <Provider store={store}>
        <App/>
      </Provider>
    )
    expect(result).toMatchSnapshot()
  });
})