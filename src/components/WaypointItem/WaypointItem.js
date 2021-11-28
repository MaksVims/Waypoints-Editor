import React from 'react';
import classes from './style.module.scss'

const WaypointItem = ({point, handleClick, ...props}) => {
  return (
    <div
      className={classes.waypoint}
      {...props}
    >
      <p>{point?.geo?.address}</p>
      <button
        className={classes.removeButton}
        onClick={() => handleClick(point.id)}
      >-
      </button>
    </div>
  );
};

export default WaypointItem;