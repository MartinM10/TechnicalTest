from fastapi import APIRouter
from .schemas import Todo
from .crud import load_todos, save_todos

todos_router = APIRouter()


@todos_router.get("/todos", response_model=list[Todo])
def get_todos():
    """Get all todos."""
    return load_todos()


@todos_router.post("/todos", response_model=Todo)
def add_todo(todo: Todo):
    """
    Add a new todo.

    Args:
        todo (Todo): The todo to add.
    """
    todos = load_todos()
    todos.append(todo)
    save_todos(todos)
    return todo
