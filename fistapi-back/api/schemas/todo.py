from typing import Optional

from pydantic import BaseModel, Field

class Todo(BaseModel):
    id: int
    title: Optional[str] = Field(None, example="React Lesson")
    done: bool = Field(False, description="done")