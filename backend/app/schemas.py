from pydantic import BaseModel


class Todo(BaseModel):
    id: int | None = None
    title: str | None = None
    completed: bool | None = False
    description: str | None = None
    favorite: bool | None = False

class TodoUpdate(BaseModel):
    completed: bool | None = None
    description: str | None = None
    favorite: bool | None = None