import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from './style.module.scss'
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {removeWaypoint, reorderedWaypoint} from "../../store/slices";
import WaypointItem from "../WaypointItem/WaypointItem";


const WaypointsList = () => {
  const waypoints = useSelector(state => state?.waypoints?.waypoints)
  const dispatch = useDispatch()

  const handleRemoveWaypoint = useCallback((id) => dispatch(removeWaypoint(id)), [dispatch])

  const handleOnDragEnd = useCallback((result) => {
    // Проверка на drop внутри контейнера
    if (!result.destination) return

    const from = result.source.index
    const to = result.destination.index
    // Изменяем порядок элементов в массиве
    dispatch(reorderedWaypoint({from, to}))
  }, [dispatch])


  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={"waypoint-list"}>
          {provided => (
            <ul
              id="waypoint-list"
              className={[classes.waypointList]}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {waypoints?.map((point, idx) => (
                <Draggable key={point.id} draggableId={String(point.id)} index={idx}>
                  {provided => (
                    <li
                      className={classes.dragWrapper}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <WaypointItem
                        point={point}
                        handleClick={handleRemoveWaypoint}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default WaypointsList;