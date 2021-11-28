import React from "react";
import Loader from "./Loader";
import {css} from "@emotion/react";
import {render} from "@testing-library/react";

const overrideLoader = css`
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  border-color: red;
`;
const props = {loading: true, size: 100, color: 'red', css: overrideLoader}
let container = null;

describe("Loading component", () => {

  beforeEach(() => {
    container = document.createElement('div')
    document.body.append(container)
  })

  afterEach(() => {
    container.remove()
    container = null
  })

  it('should render component', function () {
    render(<Loader {...props}/>, container)
    expect(container.children.length).not.toBeNull()
  });


  it('should not render component', function () {
    render(<Loader {...props} loading={false}/>, container)
    expect(container.children.length).toBe(0)
  });


  it('should component equal to snapshot', function () {
    const loader = render(<Loader {...props}/>, container)
    expect(loader).toMatchSnapshot()
  });
})