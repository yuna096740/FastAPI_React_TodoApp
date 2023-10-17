import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home"; 
import { About } from "./About";
import TodoApp from "./TodoApp";
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
    <div className="App stack-large">
      <BrowserRouter>
        <Navbar />
        
          <Routes>
            <Route exact path="/" element={ <Home /> } />
            <Route exact path="/about" element={ <About /> } />
            <Route exact path="/todo" element={ <TodoApp  subject="FastAPI & React" todos={ DATA } /> } />
          </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;