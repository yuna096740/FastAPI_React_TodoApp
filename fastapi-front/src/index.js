import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const DATA = [
  { id: "todo-0", title: "FastAPI", completed: true },
  { id: "todo-1", title: "React", completed: false },
  { id: "todo-2", title: "Laravel", completed: false },
  { id: "todo-3", title: "PHP", completed: false },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App subject="FastAPI & React" todos={ DATA }/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
