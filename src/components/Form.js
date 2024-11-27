import React from "react";

export default function Form({ handleSubmit, value, handleOnChange }) {
  return (
    <form onSubmit={handleSubmit} className="flex pb-2">
      <input
        type="text"
        name="value"
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        placeholder="할 일을 입력해주세요."
        value={value}
        onChange={handleOnChange}
      />
      <input
        type="submit"
        value="입력"
        className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
      />
    </form>
  );
}
