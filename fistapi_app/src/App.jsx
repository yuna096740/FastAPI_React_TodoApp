import React, { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

import Navbar from "./compornents/Navbar/nav";
import Footer from "./compornents/Footer/footter";
import AddTaskForm from "./compornents/From/AddTaskFrom";
import Todo from "./compornents/List/Todo";

// フィルタ定義
const FILTER_MAP = {
  ALL: () => true,
  DO: (task) => !task.completed,
  DONE: (task) => task.completed,
};

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

  const [filter, setFilter] = useState("ALL");

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) =>
      <Todo
        id={ task.id }
        name={ task.name }
        completed={ task.completed }
        key={ task.id }
        //toggleTaskCompleted={ toggleTaskCompleted }
        //deleteTask={ deleteTask }
        //editTask={ editTask }
      />
    );

	return (
		<div className="App stack-large">
      <Navbar />

        <h1>{ subject } Lesson!</h1>

        <AddTaskForm addTask={ addTask } />

        <div>ここに処理を書いていきます</div>
        {data ? <div>{data.Hello}</div> : <button onClick={GetData}>データを取得</button>}

        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-hedding">
            { taskList }
        </ul>

      <Footer />
		</div>
	);
}

export default App;