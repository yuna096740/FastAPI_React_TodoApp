from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from api.db import Base


class Todo(Base):
    __tablename__ = "todos"
    
    id = Column(Integer, primary_key=True)
    title = Column(String(1024))
    
    done = relationship("Done", back_populates="todo", cascade="delete")


class Done(Base):
    __tablename__ = "dones"
    
    id = Column(Integer, ForeignKey("todos.id"), primary_key=True)
    
    todo = relationship("Todo", back_populates="done")