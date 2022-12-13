import React from "react";
import BoardForm from "../forms/BoardForm";
import { useState, useEffect } from "react";
import db from "../../utils/firebase";
import Board from "./Board";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { collection, onSnapshot } from "firebase/firestore";
import BoardEditAndDeleteButton from "./BoardEditAndDeleteButton"

export default function Home() {
  const [boards, setBoards] = useState(null);
  useEffect(
    () =>
      onSnapshot(collection(db, "boards"), (snapshot) =>
        setBoards(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const [boardClick, setBoardClick] = useState(false);
  return (
    <div className="relative flex flex-col items-center justify-center gap-10 bg-gray-50">
      <button
        type="button"
        onClick={() => setBoardClick(true)}
        className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none shadow-indigo-200 active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed"
      >
        Create new Workspace
      </button>
      <BoardForm trigger={boardClick} setTrigger={setBoardClick} />
      <div className="flex flex-wrap items-center justify-center gap-16 mt-10">
        {boards ? (
          boards.map((ele) => {
            return (
              <div>
              <Link to={`/tasks/${ele.id}`} className="w-48 h-48" key={ele.id}>
                <Board props={ele} />
              </Link>
              <BoardEditAndDeleteButton/>
              </div>
            );
          })
        ) : (
          <div className="relative mt-24">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
