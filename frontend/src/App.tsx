// src/App.tsx
import { useState, useEffect } from "react";
import type { Todo } from "./types/todo";
import {
  getTodos,
  createTodo,
  toggleTodoStatus,
  deleteTodo,
  updateFavoriteStatus,
} from "./api/todo";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTodos = () => {
    getTodos().then((data) => {
      setTodos(data);
    });
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = () => {
    if (!title.trim()) return;
    createTodo(title, description).then(() => {
      setTitle("");
      setDescription("");
      loadTodos(); // Recargar después de crear
    });
  };

  const toggleTodo = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toggleTodoStatus(id, !!todo.completed).then(() => {
      loadTodos(); // Recargar después de cambiar estado
    });
  };

  const handleDelete = (id: number) => {
    deleteTodo(id).then(() => {
      loadTodos(); // Recargar después de borrar
    });
  };

  const handleFavorite = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    updateFavoriteStatus(id, !!todo.favorite);
    loadTodos(); // Recargar después de actualizar favorito
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

        <TodoForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          addTodo={addTodo}
          loadTodos={loadTodos}
        />

        {/* Sección de tareas favoritas usando el componente TodoList*/}
        <h2 className="text-xl font-semibold mt-6 mb-2 text-yellow-600">Favoritas</h2>
        {todos.filter((todo) => todo.favorite).length === 0 ? (
          <div className="text-gray-400 text-sm mb-8">No hay tareas favoritas.</div>
        ) : (
          <TodoList
            todos={todos.filter((todo) => todo.favorite)}
            toggleTodo={toggleTodo}
            handleFavorite={handleFavorite}
            handleDelete={handleDelete}
            highlight={true}
          />
        )}

        {/* Sección de tareas normales usando el componente TodoList */}
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Otras tareas</h2>
        {todos.filter((todo) => !todo.favorite).length === 0 ? (
          <div className="text-gray-400 text-sm">No hay otras tareas.</div>
        ) : (
          <TodoList
            todos={todos.filter((todo) => !todo.favorite)}
            toggleTodo={toggleTodo}
            handleFavorite={handleFavorite}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
