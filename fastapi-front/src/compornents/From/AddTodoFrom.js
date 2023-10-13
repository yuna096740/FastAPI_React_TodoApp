import React, { useState } from "react";

function AddTodoForm(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // デフォルトの送信動作を防ぐ
    props.addTodo(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={ handleSubmit }>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What do you want to do?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={ name }
        onChange={ handleChange }
      />

      <button type="submit" className="btn btn__primary btn__lg">
        Add Todo
      </button>

    </form>
  )
}

export default AddTodoForm;