import React, { useState } from "react";
import "./TodoStyle.css";
import "./checkbox.css"

export default function Todo(props) {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTodo(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={ handleSubmit }>
      <div className="form-group">
        <label className="todo-label" htmlFor={ props.id }>
          Editing Todos <b>" { props.name } " </b>
        </label>

        <input
          id={ props.id }
          className="todo-text"
          type="text"
          value={ newName }
          onChange={ handleChange }
        />
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={ () => setEditing(false) } >
            Back <span className="visually-fidden">renaming { props.mame }</span>
        </button>

        <button type="submit" className="btn btn__primary todo-edit">
          Save <span className="visually-hidden">New Name is { props.name }</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={ props.id }
          type="checkbox"
          defaultChecked={ props.completed }
          onChange={ () => props.toggleTodoCompleted(props.id) }
        />

        <label className="todo-label" htmlFor={ props.id }>
          { props.name }
        </label>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={ () => setEditing(true) }
        >
            Edit <span className="visually-hidden">{ props.name }</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={ () => props.deleteTodo(props.id) }>
            Delete <span className="visually-hidden">{ props.name }</span>
        </button>
      </div>
    </div>
  );

  return (
    <li className="todo stack-small">
      { isEditing ? editingTemplate : viewTemplate }
    </li>
  );
}