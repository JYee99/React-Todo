import React, { useCallback, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];
export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

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
    localStorage.setItem("todoData", JSON.stringify([newTodo, ...todoData]));

    setValue("");
  };

  const handleClick = useCallback(
    (id) => {
      const newData = todoData.filter((todo) => todo.id !== id);
      setTodoData(newData);
      localStorage.setItem("todoData", JSON.stringify(newData));
    },
    [todoData]
  );
  const handleEnd = (result) => {
    // result 매개변수에는 source 항목 및 대상 위치 등 드래그 이벤트에 대한 정보가 포함
    console.log(result);

    // 목적지가 없으면 함수 종료
    if (!result.destination) return;

    // 리액트 불변성을 지키기 위해 newDotoData 생성
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 삭제
    // 2. return 값으로 삭제된 아이템을 저장
    const [reloadItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reloadItem을 insert
    newTodoData.splice(result.destination.index, 0, reloadItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };
  const handleAllRemove = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleAllRemove}>Delete All</button>
        </div>
        <Form
          handleSubmit={handleSubmit}
          value={value}
          handleOnChange={handleOnChange}
        />
        <Lists
          todoData={todoData}
          handleEnd={handleEnd}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}
