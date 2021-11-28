import PopoverContext, {usePopover} from "./PopoverContext";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function ConsumerComponent() {
  const {showPopover} = usePopover()
  const text = 'hello'
  const e = {
    domEvent: {
      path: []
    }
  }
  const handleClick = (event) => {
    e.domEvent.path.push(event.currentTarget)
    showPopover(e, text)
  }
  return <>
    <button id="btn" onClick={handleClick}>Click</button>
  </>
}

describe(">>> C O N T E X T --- Popover Context", function () {

  it('+++ should ConsumerComponent show default view', function () {
    render(<ConsumerComponent/>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.queryByText('hello')).toBeNull()
  });

  it('+++ should when the user clicks on the button, the context works correctly', function () {
    const {getByRole} = render(
      <PopoverContext>
        <ConsumerComponent/>
      </PopoverContext>)

    userEvent.click(getByRole('button'))
    expect(screen.queryByText('hello')).toBeInTheDocument()
  });

  it('+++ should equal snapshot active popover context', function () {
    const result = render(
      <PopoverContext>
        <ConsumerComponent/>
      </PopoverContext>)

    userEvent.click(result.getByRole('button'))
    expect(result).toMatchSnapshot()
  });
})