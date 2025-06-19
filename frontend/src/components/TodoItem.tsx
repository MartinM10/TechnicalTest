import React from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  handleFavorite: (id: number) => void;
  handleDelete: (id: number) => void;
  highlight?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, handleFavorite, handleDelete, highlight }) => {
  return (
    <li
      className={`flex items-center gap-2 p-3 rounded-lg border ${
        highlight
          ? "bg-yellow-50 border-yellow-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="cursor-pointer"
      />
      <span className={`${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.title}</span>
      {todo.description && (
        <span className="text-xs text-gray-500">{todo.description}</span>
      )}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={() => handleFavorite(todo.id)}
          className={`text-yellow-500 hover:text-yellow-600 transition ${
            todo.favorite ? "opacity-100" : "opacity-50"
          } text-2xl`}
        >
          ★
        </button>
        <button
          onClick={() => handleDelete(todo.id)}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition cursor-pointer text-white"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
