from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import todo, done
from pydantic import BaseModel

from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router)
app.include_router(done.router)

@app.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return { "token": token }