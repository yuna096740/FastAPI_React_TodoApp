import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

import Navbar from "./compornents/Navbar/nav";
import Footer from "./compornents/Footer/footter";
import AddTodoForm from "./compornents/From/AddTodoFrom";
import FilterButton from "./compornents/Btn/FilterButton";
import Todo from "./compornents/List/Todo";
import Sample from "./test";

import "./App.css";

// フィルタ定義
const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};
const FILTER_TITLES = Object.keys(FILTER_MAP);

function App(props) {

  // title
  const subject = props.subject;
  const [todos, setTodos] = useState(props.todos)
  const [filter, setFilter] = useState("All");

  const todoList = todos
    // statusのフィルタリング
    .filter(FILTER_MAP[filter])
    .map((todo) => 
      <Todo 
        id ={ todo.id } 
        title={ todo.title }
        completed={ todo.completed }
        key={ todo.id }
        toggleTodoCompleted={ toggleTodoCompleted }
        deleteTodo={ deleteTodo }
        editTodo={ editTodo }
      />
    );

  useEffect(() => {
    // FastAPIのエンドポイントからデータを取得
    axios
      .get("http://localhost:8000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }, []);

  // Todoの追加処理
  function addTodo(title) {
    const newTodo = { id: `todo-${ nanoid() }`, title, completed: false};
    axios
      .post("http://localhost:8000/todos", newTodo)
      .then((response) => {
        console.log("success");
        setTodos([...todos, response.data]); // スプレッド演算子(今ある配列に代入)
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }

  // change aria-pressed
  const filterList = FILTER_TITLES.map((title) => (
    <FilterButton
      key={ title }
      title={ title }
      isPressed={ title === filter }
      setFilter={ setFilter }
    />
  ));

  // Todo done更新処理
  function toggleTodoCompleted(id) {
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  // Todoの編集処理
  function editTodo(id, newTitle) {
    const editTodoList = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });
    setTodos(editTodoList);

    // FastAPIバックエンドに更新を送信
    const editedTodo = editTodoList.find((todo) => todo.id === id);
    axios
      .put(`http://localhost:8000/todos/${id}`, editedTodo)
      .then((response) => {
        console.log("Success", response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }

  // Todoの削除処理
  function deleteTodo(id) {
    const confirm = window.confirm("Are you Sure?");
    if (confirm) {
      const remainingTodos = todos.filter((todo) => id !== todo.id);
      setTodos(remainingTodos);
    };
  }

	return (
    <div className="App stack-large">
      <Navbar />
        <div className="TodoApp">
      
          <h1>{ subject } Lesson!</h1>

          <AddTodoForm addTodo={ addTodo } />

          <div className="filters btn-group stack-exception">
            { filterList }
          </div>

          <Sample />

          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-hedding">
              { todoList }
          </ul>

        </div>
      <Footer />
		</div>
	);
}

export default App;