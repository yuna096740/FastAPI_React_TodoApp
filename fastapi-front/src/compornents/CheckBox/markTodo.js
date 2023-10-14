import axios from "axios";


function markTodos() {

  // ToDoを完了にする
  function markTodoAsDone(id) {
    // FastAPIのエンドポイントにPUTリクエストを送信
    axios
      .put(`http://localhost:8000/todos/${id}/done`)
      .then((response) => {
        console.log("Success", response.data);
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
        console.log("Success", response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }
  
  // Todo done更新処理
  function toggleTodoCompleted(id) {
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        // ToDoの完了状態をトグル
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  
    // FastAPIバックエンドに更新を送信
    if (updatedTodos.find((todo) => todo.id === id).completed) {
      markTodoAsDone(id);
    } else {
      unmarkTodoAsDone(id);
    }
  }
}
