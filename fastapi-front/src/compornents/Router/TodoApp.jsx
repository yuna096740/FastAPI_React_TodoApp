import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

import AddTodoForm from "../From/AddTodoFrom";
import FilterButton from "../Btn/FilterButton";
import Todo from "../List/Todo";


// フィルタ定義
const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.done,
  Done: (todo) => todo.done,
};
const FILTER_TITLES = Object.keys(FILTER_MAP);

function TodoApp(props) {

  // title
  const subject = props.subject;
  const [todos, setTodos] = useState(props.todos)
  const [filter, setFilter] = useState("All");

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

  const todoList = todos
    // statusのフィルタリング
    .filter(FILTER_MAP[filter])
    .map((todo) => 
      <Todo 
        id ={ todo.id } 
        title={ todo.title }
        done={ todo.done }
        key={ todo.id }
        toggleTodoDone={ toggleTodoDone }
        deleteTodo={ deleteTodo }
        editTodo={ editTodo }
      />
    );

  // Todoの追加処理
  function addTodo(title) {
    const newTodo = { id: `todo-${ nanoid() }`, title, done: false};
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

  // ToDoを完了にする
  function markTodoAsDone(id) {
    // FastAPIのエンドポイントにPUTリクエストを送信
    axios
      .put(`http://localhost:8000/todos/${id}/done`)
      .then((response) => {
        console.log("markSuccess", response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }
  
  // ToDoを未完了に戻す
  function unmarkTodoAsDone(id) {
    // FastAPIのエンドポイントにDELETEリクエストを送信
    axios
      .delete(`http://localhost:8000/todos/${id}/done`)
      .then((response) => {
        console.log("unmarkSuccess", response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }
  
  // Todo done更新処理
  function toggleTodoDone(id) {
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        // ToDoの完了状態をトグル
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  
    // FastAPIバックエンドに更新を送信
    if (updatedTodos.find((todo) => todo.id === id).done) {
      markTodoAsDone(id);
    } else {
      unmarkTodoAsDone(id);
    }
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
      // FastAPIバックエンドに削除リクエストを送信
      axios
        .delete(`http://localhost:8000/todos/${id}`)
        .then((response) => {
          console.log("Success: Todo deleted");
          const remainingTodos = todos.filter((todo) => id !== todo.id);
          setTodos(remainingTodos);
        })
        .catch((error) => {
          console.error("error:", error);
        });
    };
  }

	return (
    <div className="TodoApp">
  
      <h1>{ subject } Lesson!</h1>

      <AddTodoForm addTodo={ addTodo } />

      <div className="filters btn-group stack-exception">
        { filterList }
      </div>

      

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-hedding">
          { todoList }
      </ul>

    </div>
	);
}

export default TodoApp;