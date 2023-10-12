from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import api.schemas.todo as todo_schema

import api.cruds.todo as todo_crud
from api.db import get_db

router = APIRouter()

@router.get("/todos", response_model=List[todo_schema.Todo])
async def list_todos(db: AsyncSession = Depends(get_db)):
    return await todo_crud.get_todos_with_done(db)


@router.post("/todos", response_model=todo_schema.TodoCreateResponse)
async def create_todo(
    todo_body: todo_schema.TodoCreate, db: AsyncSession = Depends(get_db)
):
    return await todo_crud.create_todo(db, todo_body)


@router.put("/todos/{todo_id}", response_model=todo_schema.TodoCreateResponse)
async def update_todo(
    todo_id: int, todo_body: todo_schema.TodoCreate, db: AsyncSession = Depends(get_db)
):
    todo = await todo_crud.get_todo(db, todo_id=todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo is not found")
    
    return await todo_crud.update_todo(db, todo_body, original=todo)


@router.delete("/todos/{todo_id}", response_model=None)
async def delete_todo(todo_id: int):
    return 