import {mockWaypoint} from "../../const";
import {render, screen} from "@testing-library/react";
import WaypointItem from "./WaypointItem";
import userEvent from "@testing-library/user-event";
import classes from './style.module.scss'

describe(">>> C O M P O N E N T --- Waypoint", function () {
  let handler, waypoint

  beforeEach(() => {
      waypoint = {...mockWaypoint}
      handler = jest.fn()
    }
  )

  it('+++ should render component', function () {
    render(
      <WaypointItem point={waypoint} handleClick={handler}
      />
    )

    expect(screen.getByText(waypoint.geo.address)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('+++ should handle click its working ', function () {
    render(
      <WaypointItem point={waypoint} handleClick={handler}/>
    )

    userEvent.click(screen.getByRole('button'))
    expect(handler).toBeCalledTimes(1)
  })

  it('+++ should button have correct class name', function () {
    render(
      <WaypointItem point={waypoint} handleClick={handler}/>
    )

    expect(screen.getByRole('button')).toHaveClass(classes.removeButton)
  });

  it('+++ should equal snapshot', function () {
    const result = render(
      <WaypointItem point={waypoint} handleClick={handler}/>
    )

    expect(result).toMatchSnapshot()
  });
})