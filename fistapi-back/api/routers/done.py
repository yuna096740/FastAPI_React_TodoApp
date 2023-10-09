from fastapi import APIRouter

router = APIRouter()

@router.put("/todos/{todo_id}/done")
async def mark_todo_as_done():
  pass

@router.delete("/todos/{todo_id}/done")
async def unmark_todo_as_done():
  pass