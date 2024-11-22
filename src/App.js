import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todoData, setTodoData] = useState([
    {
      id: "1",
      title: "공부하기",
      completed: true,
    },
    {
      id: "2",
      title: "밥 먹기",
      completed: false,
    },
  ]);
  const [value, setValue] = useState("");

  const btnStyle = () => ({
    color: "#fff",
    border: "none",
    padding: "5px, 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  });

  const getStyle = (completed) => ({
    padding: "10px",
    borderBottom: "1px #eee solid",
    textDecoration: completed ? "line-through" : "none",
  });

  const handleClick = (id) => {
    const newData = todoData.filter((todo) => todo.id !== id);
    setTodoData(newData);
    console.log(newData);
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    const newTodo = {
      id: Date.now().toString(),
      title: value,
      completed: false,
    };
    setTodoData([newTodo, ...todoData]);
    setValue("");
  };
  const handleCompleteChange = (id) => {
    let newTodo = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodo);
  };
  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="할 일을 입력해주세요."
            value={value}
            onChange={handleOnChange}
          />
          <input
            type="submit"
            value="입력"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
        {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input
              type="checkbox"
              defaultChecked={data.completed}
              onChange={() => handleCompleteChange(data.id)}
            />
            {data.title}
            <button style={btnStyle()} onClick={() => handleClick(data.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
