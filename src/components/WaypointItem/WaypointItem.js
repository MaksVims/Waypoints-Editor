import React from 'react';
import classes from './style.module.scss'

const WaypointItem = React.forwardRef(({point, handleClick, ...props}, ref) => {
  return (
    <li
      className={classes.waypoint}
      {...props}
      ref={ref}
    >
      <p>{point?.geo?.address}</p>
      <button
        className={classes.removeButton}
        onClick={() => handleClick(point.id)}
      >-
      </button>
    </li>
  );
});

export default WaypointItem;