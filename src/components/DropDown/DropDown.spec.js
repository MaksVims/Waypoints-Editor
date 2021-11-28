import React from "react";
import './DropDown'
import {render, screen} from "@testing-library/react";
import DropDown from "./DropDown";
import classes from './style.module.scss'
import userEvent from "@testing-library/user-event";

let container = null

describe("DropDown component", () => {
  const children = [1, 2, 3].map(item => (<li key={item}>{item}</li>))
  let close
  let show
  let props

  beforeEach(() => {
    show = true
    close = jest.fn()
    props = {close, show}
    container = document.createElement('main')
    document.body.append(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('should correct render component', function () {
    render(
      <DropDown {...props}>{children}</DropDown>
      , container)

    expect(screen.getByRole('list')).toBeInTheDocument()
  });

  it('should correct render children props', function () {
    render(
      <DropDown {...props}>{children}</DropDown>
      , container)

    expect(screen.getByText(/1/)).toBeInTheDocument()
    expect(screen.getByText(/2/)).toBeInTheDocument()
    expect(screen.getByText(/3/)).toBeInTheDocument()
  });

  it('should have show class', function () {
    render(
      <DropDown {...props}>{children}</DropDown>
      , container)

    expect(screen.getByRole('list')).toHaveClass(classes.show)
  });

  it('should not have show class show=false', function () {
    render(
      <DropDown {...props} show={false}>{children}</DropDown>
      , container)

    expect(screen.getByRole('list')).not.toHaveClass(classes.show)
  });

  it('should when the user clicks on the list item, click handler worked ', function () {
    const clickHandler = (e) => {
      e.preventDefault()
      props.close()
    }
    const children = [1, 2, 3].map(item => (<li onClick={clickHandler} key={item}>{item}</li>))
    render(
      <DropDown {...props}>{children}</DropDown>
      , container)

    userEvent.click(screen.getAllByRole('listitem')[0])
    expect(close).toHaveBeenCalledTimes(1)
  })

  it('should when clicked outside the dropdown, the close function will be triggered ', function () {
    render(
      <DropDown {...props}>{children}</DropDown>
      , container)

    userEvent.click(screen.getByRole('main'))
    expect(close).toHaveBeenCalledTimes(1)
  });

  it('should when clicking on dropdown outside the list item, the close function will not work', function () {
    render(
      <DropDown {...props}>{children}</DropDown>
      , container)
    userEvent.click(screen.getByRole('list'))
    expect(close).toHaveBeenCalledTimes(0)
  });
})