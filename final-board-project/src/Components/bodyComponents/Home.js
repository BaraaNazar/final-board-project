import React from "react";
import BoardForm from "../forms/BoardForm";
import { useState } from "react";
export default function Home() {
  const [boardClick, setBoardClick] = useState(false);
  return (
    <div className=" flex items-center justify-center flex-col relative bg-gray-50 ">
      <button
        onClick={() => setBoardClick(true)}
        className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
      >
        Create new Workspace
      </button>
      <BoardForm trigger={boardClick} setTrigger={setBoardClick} />
    </div>
  );
}