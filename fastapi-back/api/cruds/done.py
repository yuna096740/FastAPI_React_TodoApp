from typing import Tuple, Optional

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

import api.models.todo as todo_model


async def get_done(db: AsyncSession, todo_id: int) -> Optional[todo_model.Done]:
  result: Result = await db.execute(
    select(todo_model.Done).filter(todo_model.Done.id == todo_id)
  )
  done: Optional[Tuple[todo_model.Done]] = result.first()
  return done[0] if done is not None else None # 要素が一つであってもtupleで返却されるので１つ目の要素を取り出す


async def create_done(db: AsyncSession, todo_id: int) -> todo_model.Done:
  done = todo_model.Done(id=todo_id)
  db.add(done)
  await db.commit()
  await db.refresh(done)
  return done


async def delete_todo(db: AsyncSession, original: todo_model.Done) -> None:
  await db.delete(original)
  await db.commit()