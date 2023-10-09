from fastapi import APIRouter

router = APIRouter()

@router.put("/todos/{todo_id}/done", response_model=None)
async def mark_todo_as_done(todo_id: int):
    return

@router.delete("/todos/{todo_id}/done", response_model=None)
async def unmark_todo_as_done(todo_id: int):
    return