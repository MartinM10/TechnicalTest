from fastapi import APIRouter
from .schemas import Todo, TodoUpdate
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
    if not todos:
        todo.id = 1
    else:
        todo.id = len(todos) + 1
    # Si no se proporciona descripción, poner None
    if not hasattr(todo, 'description') or todo.description is None:
        todo.description = None
    todos.append(todo)
    save_todos(todos)
    return todo

@todos_router.patch("/todos/{todo_id}")
def update_todo(todo_id: int, update: TodoUpdate):
    """
    Update the completed status of an existing todo.

    Args:
        todo (Todo): The todo to update.
    """
    todos = load_todos()
    for todo in todos:
        if todo.id == todo_id:
            todo.completed = update.completed if update.completed is not None else todo.completed
            todo.description = update.description if update.description is not None else todo.description
            todo.favorite = update.favorite if update.favorite is not None else todo.favorite
            save_todos(todos)
            return todo
    return {"message": "Todo not found"}


@todos_router.delete("/todos/{todo_id}", response_model=dict)
def delete_todo(todo_id: int):
    """
    Delete a todo by its ID.

    Args:
        todo_id (int): The ID of the todo to delete.
    """
    todos = load_todos()
    todos = [todo for todo in todos if todo.id != todo_id]
    save_todos(todos)
    return {"message": "Todo deleted successfully"}