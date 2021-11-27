import React from 'react';
import {css} from "@emotion/react";
import {PuffLoader} from "react-spinners";

const overrideLoader = css`
  display: block;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  border-color: red;
`;

const Loader = ({loading, color, size}) => {
  return (
    <PuffLoader
      loading={loading} color={color} css={overrideLoader} size={size} speedMultiplier={1.5}/>
  );
};

export default Loader;