import {render, screen} from "@testing-library/react";
import SearchPlace from "./SearchPlace";
import {configureStore} from "@reduxjs/toolkit";
import {waypointsReducer} from "../../store/slices";
import {Provider} from "react-redux";


describe(">>> C O M P O N E N T", function () {
  let store, result

  beforeEach(() => {
    store = configureStore({
      reducer: {'w': waypointsReducer}
    })
    result = render(<Provider store={store}><SearchPlace/></Provider>)
  })


  it('+++ should render component', function () {
    expect(screen.queryByRole('textbox')).not.toBeNull()
    expect(screen.queryByRole('list')).not.toBeNull()
  });

  it('+++ should equal snapshot', async function () {
    expect(result).toMatchSnapshot()
  });

})