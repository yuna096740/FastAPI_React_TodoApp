from typing import List, Tuple

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.engine import Result

import api.models.todo as todo_model
import api.schemas.todo as todo_schema

async def create_todo(
    db: AsyncSession, todo_create: todo_schema.TodoCreate
) -> todo_model.Todo:
    todo = todo_model.Todo(**todo_create.dict())
    db.add(todo)
    await db.commit()
    await db.refresh(todo)
    return todo


async def get_todos_with_done(db: AsyncSession) -> List[Tuple[int, str, bool]]:
    result: Result = await (
        db.execute(
            select(
                todo_model.Todo.id,
                todo_model.Todo.title,
                todo_model.Done.id.isnot(None).label("done"),
            ).outerjoin(todo_model.Done)
        )
    )
    return result.all()