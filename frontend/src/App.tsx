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
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las tareas");
      console.error("Error loading todos:", err);
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      await createTodo(title, description);
      setTitle("");
      setDescription("");
      await loadTodos();
      setError(null);
    } catch (err) {
      setError("Error al crear la tarea");
      console.error("Error creating todo:", err);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      await toggleTodoStatus(id, !!todo.completed);
      await loadTodos();
      setError(null);
    } catch (err) {
      setError("Error al actualizar el estado de la tarea");
      console.error("Error toggling todo:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      await loadTodos();
      setError(null);
    } catch (err) {
      setError("Error al eliminar la tarea");
      console.error("Error deleting todo:", err);
    }
  };

  const handleFavorite = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      await updateFavoriteStatus(id, !!todo.favorite);
      await loadTodos();
      setError(null);
    } catch (err) {
      setError("Error al actualizar favorito");
      console.error("Error updating favorite:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

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
