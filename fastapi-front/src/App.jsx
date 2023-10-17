import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { About } from "./About";
import TodoApp from "./TodoApp.jsx";
import Navbar from "./compornents/Navbar/nav";
import Footer from "./compornents/Footer/footter";
import "./App.css";

const DATA = [
  { id: "todo-0", title: "FastAPI", completed: true },
  { id: "todo-1", title: "React", completed: false },
  { id: "todo-2", title: "Laravel", completed: false },
  { id: "todo-3", title: "PHP", completed: false },
]

function App() {
  return (
    <div className="Todo-app stack-large">
      <Navbar />

      <BrowserRouter>
        <div className="App">
          <Link to="/">Home</Link>
          <br />
          <Link to="/about">About</Link>
          <br />
          <Link to="/todo">Todo</Link>
          <br />

          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route exact path="/about" element={ <About /> } />
            <Route exact path="/todo" element={ <TodoApp  subject="FastAPI & React" todos={ DATA } /> } />
          </Routes>

        </div>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;