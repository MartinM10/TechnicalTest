// src/components/TodoForm.tsx
import React from "react";

interface TodoFormProps {
  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
  loadTodos: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  title,
  description,
  setTitle,
  setDescription,
  addTodo,
  loadTodos,
}) => {
  return (
    <div className="flex gap-2 mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={addTodo}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
      >
        Add
      </button>
      <button
        onClick={loadTodos}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
      >
        Load Tasks
      </button>
    </div>
  );
};

export default TodoForm;
