from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import api.schemas.done as done_schema
import api.cruds.done as done_crud
from api.db import get_db

router = APIRouter()

@router.put("/todos/{todo_id}/done", response_model=done_schema.DoneResponse)
async def mark_todo_as_done(todo_id: int, db: AsyncSession = Depends(get_db)):
    done = await done_crud.get_done(db, todo_id=todo_id)
    if done is not None:
        raise HTTPException(status_code=400, detail="done already exists")
    
    return await done_crud.create_done(db, todo_id)


@router.delete("/todos/{todo_id}/done", response_model=None)
async def unmark_todo_as_done(todo_id: int, db: AsyncSession = Depends(get_db)):
    done = await done_crud.get_done(db, todo_id=todo_id)
    if done is None:
        raise HTTPException(status_code=404, detail="Done is not found")
    
    return await done_crud.delete_todo(db, original=done)