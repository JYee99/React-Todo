import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editeTitle, setEditeTitle] = useState(title);

    const handleCompleteChange = (id) => {
      let newTodo = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodo);
      localStorage.setItem("todoData", JSON.stringify(newTodo));
    };
    const handleEditChange = (e) => {
      setEditeTitle(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editeTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className=" flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full px-3 py-2 mr-4 text-gray-500"
              value={editeTitle}
              onChange={handleEditChange}
              autoFocus
            />
          </form>
          <div className="items-center">
            <button className="px-4 py-2" type="submit" onClick={handleSubmit}>
              save
            </button>
            <button
              className="px-4 py-2 "
              onClick={() => setIsEditing(false)}
              type="button"
            >
              x
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-300" : "bg-gray-50"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}
        >
          <div className="items-center">
            <input
              type="checkbox"
              defaultChecked={completed}
              onChange={() => handleCompleteChange(id)}
            />
            <span className={`${completed ? "line-through" : undefined} px-2 `}>
              {title}
            </span>
          </div>
          <div>
            <button className="px-4 py-2" onClick={() => setIsEditing(true)}>
              eidt
            </button>
            <button className="px-4 py-2" onClick={() => handleClick(id)}>
              x
            </button>
          </div>
        </div>
      );
    }
  }
);
export default List;
