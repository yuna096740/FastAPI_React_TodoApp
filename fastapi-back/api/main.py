from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import todo, done
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router)
app.include_router(done.router)

class TestParam(BaseModel):
    param1 : str
    param2 : str
    
# curl http://localhost:8000/
@app.get("/")
def get_root():
    return {"message": "fastapi sample"}

# curl -X POST -H "Content-Type: application/json" -d '{"param1":"test1", "param2":"text2"}' http://localhost:8000/
@app.post("/")
def post_root(testParam : TestParam):
    print(testParam)
    return testParam