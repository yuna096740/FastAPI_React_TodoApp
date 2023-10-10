from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
import api.schemas.todo as todo_schema

import api.cruds.todo as todo_crud
from api.db import get_db

router = APIRouter()

@router.get("/todos", response_model=List[todo_schema.Todo])
async def list_todos():
    return [todo_schema.Todo(id=1, title="todo test1", done=True)]


@router.post("/todos", response_model=todo_schema.TodoCreateResponse)
async def create_todo(
    todo_body: todo_schema.TodoCreate, db: AsyncSession = Depends(get_db)
):
    return await todo_crud.create_todo(db, todo_body)


@router.put("/todos/{todo_id}", response_model=todo_schema.TodoCreateResponse)
async def update_todo(todo_id: int, todo_body: todo_schema.TodoCreate):
    return todo_schema.TodoCreateResponse(id=todo_id, **todo_body.dict())


@router.delete("/todos/{todo_id}", response_model=None)
async def delete_todo(todo_id: int):
    return 