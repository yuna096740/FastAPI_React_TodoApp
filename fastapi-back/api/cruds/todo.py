from typing import List, Tuple, Optional

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
                # todo_model.Todo.detail,
                todo_model.Done.id.isnot(None).label("done"),
            ).outerjoin(todo_model.Done)
        )
    )
    return result.all()


async def get_todo(db: AsyncSession, todo_id: int) -> Optional[todo_model.Todo]:
    result: Result = await db.execute(
        select(todo_model.Todo).filter(todo_model.Todo.id == todo_id)
    )
    todo: Optional[Tuple[todo_model.Todo]] = result.first()
    return todo[0] if todo is not None else None # 要素が一つであってもtupleで返却されるので１つ目の要素を取り出す


async def update_todo(
    db: AsyncSession, todo_create: todo_schema.TodoCreate, original: todo_model.Todo
) -> todo_model.Todo:
    original.title = todo_create.title
    db.add(original)
    await db.commit()
    await db.refresh(original)
    return original


async def delete_todo(db: AsyncSession, original: todo_model.Todo) -> None:
    await db.delete(original)
    await db.commit()