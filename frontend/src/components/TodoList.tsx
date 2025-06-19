import React from "react";
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  handleFavorite: (id: number) => void;
  handleDelete: (id: number) => void;
  highlight?: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, handleFavorite, handleDelete, highlight }) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          handleFavorite={handleFavorite}
          handleDelete={handleDelete}
          highlight={highlight}
        />
      ))}
    </ul>
  );
};

export default TodoList;
