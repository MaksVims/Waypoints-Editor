import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {removeWaypoint, reorderedWaypoint} from "../store/slices";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

const WaypointsListContainer = styled.div``

const Waypoint = styled.li`
  background-color: #fff;
  cursor: pointer;
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid ${props => props.theme.color.light};

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  @media (max-width: ${props => props.theme.media.middle}) {
    font-size: 18px;
  }
`
const WaypointText = styled.p``

const WaypointList = styled.ul`
  position: relative;
  width: 100%;
`

const RemoveButton = styled.button`
  border-radius: 2px;
  font-size: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.color.danger};
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: #fff;
  margin-left: 5px;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${props => props.theme.media.middle}) {
    width: 22px;
    height: 22px;
  }
`

const WaypointsList = () => {
  const waypoints = useSelector(state => state.waypoints.waypoints)
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
    <WaypointsListContainer>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="waypointList">
          {provided => (
            <WaypointList
              className="waypointList"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {waypoints?.map((point, idx) => (
                <Draggable key={point.id} draggableId={String(point.id)} index={idx}>
                  {provided => (
                    <Waypoint
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <WaypointText>{point.geo.address}</WaypointText>
                      <RemoveButton onClick={() => handleRemoveWaypoint(point.id)}>-</RemoveButton>
                    </Waypoint>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </WaypointList>
          )}
        </Droppable>
      </DragDropContext>
    </WaypointsListContainer>
  );
};

export default WaypointsList;