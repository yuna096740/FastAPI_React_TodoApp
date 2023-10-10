from sqlalchemy.ext.asynio import AsyncSession

import api.models.todo as todo_model
import api.schemas.todo as todo_schema

async def create_todo(
    db: AsyncSession, todo_create: todo_schema.TodoCreate
) -> todo_model.Todo:
    todo = todo_model.todo(**todo_create.dict())
    db.add(todo)
    await db.commit()
    await db.refresh(todo)
    return todo