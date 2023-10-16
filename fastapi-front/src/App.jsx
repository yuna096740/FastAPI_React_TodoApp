import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import TodoApp from "./TodoApp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Link to="/">Home</Link> */}
        <br />
        {/* <Link to="/about">About</Link> */}
        <br />
        <Link to="/todo">Todo</Link>
        <br />

        <Routes>
          <Route exact path="/todo" element={ <TodoApp /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;