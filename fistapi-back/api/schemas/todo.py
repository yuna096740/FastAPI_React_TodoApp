from typing import Optional
from pydantic import BaseModel, Field

class TodoBase(BaseModel):
    title: Optional[str] = Field(None, example="FastAPI Lesson")


class TodoCreate(TodoBase):
    pass


class TodoCreateResponse(TodoCreate):
    id: int

    class Config:
        orm_mode = True # DBと接続する際に使用


class Todo(TodoBase):
    id: int
    done: bool = Field(False, description="done")

    class Config:
        orm_mode = True # DBと接続する際に使用