from typing import List
from fastapi import APIRouter
import api.schemas.todo as todo_schema

router = APIRouter()

@router.get("/todos", response_model=List[todo_schema.Todo])
async def list_todos():
    return [todo_schema.Todo(id=1, title="todo test1", done=False)]

@router.post("/todos")
async def create_todo():
    pass

@router.put("/todos/{todo_id}")
async def update_todo():
    pass

@router.delete("/todos/{todo_id}")
async def delete_todo():
    pass