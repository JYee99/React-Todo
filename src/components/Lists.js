import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(
  ({ todoData, handleEnd, setTodoData, handleClick }) => {
    return (
      <div>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="todo"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todoData.map((data, index) => (
                  <Draggable key={data.id} draggableId={data.id} index={index}>
                    {(provided, snapshot) => (
                      <List
                        key={data.id}
                        id={data.id}
                        title={data.title}
                        completed={data.completed}
                        todoData={todoData}
                        setTodoData={setTodoData}
                        provided={provided}
                        snapshot={snapshot}
                        handleClick={handleClick}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
);
export default Lists;
