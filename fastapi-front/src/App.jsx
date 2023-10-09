import React, { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

import Navbar from "./compornents/Navbar/nav";
import Footer from "./compornents/Footer/footter";
import AddTaskForm from "./compornents/From/AddTaskFrom";
import FilterButton from "./compornents/Btn/FilterButton";
import Todo from "./compornents/List/Todo";

import "./App.css";

// フィルタ定義
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
	const [data, setData] = React.useState();
	const url = "http://127.0.0.1:8000";
	const GetData = () => {
		axios.get(url).then((res) => {
			setData(res.data);
		});
	};

  // title
  const subject = props.subject;
  const [tasks, setTasks] = useState(props.tasks)

  // Taskの追加処理
  function addTask(name) {
    const newTask = { id: `todo-${ nanoid() }`, name, completed: false};
    // スプレッド演算子(今ある配列に代入)
    setTasks([...tasks, newTask]);
  }

  const [filter, setFilter] = useState("All");

  const taskList = tasks
    // statusのフィルタリング
    .filter(FILTER_MAP[filter])
    .map((task) => 
      <Todo 
        id ={ task.id } 
        name={ task.name } 
        completed={ task.completed }
        key={ task.id }
        toggleTaskCompleted={ toggleTaskCompleted }
        deleteTask={ deleteTask }
        editTask={ editTask }
      />
    );

  // change aria-pressed
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={ name }
      name={ name }
      isPressed={ name === filter }
      setFilter={ setFilter }
    />
  ));

  // Task checked or not & Taskの更新処理
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // Taskの編集処理
  function editTask(id, newName) {
    const editTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editTaskList);
  }

  // Taskの削除処理
  function deleteTask(id) {
    const confirm = window.confirm("Are you Sure?");
    if (confirm) {
      const remainingTasks = tasks.filter((task) => id !== task.id);
      setTasks(remainingTasks);
    };
  }

	return (
    <div className="App stack-large">
      <Navbar />
        <div className="TodoApp">
      
          <h1>{ subject } Lesson!</h1>

          <AddTaskForm addTask={ addTask } />

          <div className="filters btn-group stack-exception">
            { filterList }
          </div>

          <div>ここに処理を書いていきます</div>
          {data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}

          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-hedding">
              { taskList }
          </ul>

        </div>
      <Footer />
		</div>
	);
}

export default App;