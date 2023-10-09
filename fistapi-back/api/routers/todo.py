from fastapi import APIRouter

router = APIRouter()

@router.get("/todos")
async def list_todos():
  pass

@router.post("/todos")
async def create_todo():
  pass

@router.put("/todos/{todo_id}")
async def update_todo():
  pass

@router.delete("/todos/{todo_id}")
async def delete_todo():
  pass