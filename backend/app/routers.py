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
    todos.append(todo)
    save_todos(todos)
    return todo

@todos_router.patch("/todos/{todo_id}", response_model=Todo)
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
            save_todos(todos)
            return todo
    return {"message": "Todo not found"}