import React, { useState } from "react";
import "./TodoStyle.css";
import "./checkbox.css"

export default function Todo(props) {

  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  function handleChange(e) {
    setNewTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTodo(props.id, newTitle);
    setNewTitle("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={ handleSubmit }>
      <div className="form-group">
        <label className="todo-label" htmlFor={ props.id }>
          Editing Todos <b>" { props.title } " </b>
        </label>

        <input
          id={ props.id }
          className="todo-text"
          type="text"
          value={ newTitle }
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
          Save <span className="visually-hidden">New Title is { props.title }</span>
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
          { props.title }
          { props.id }
        </label>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={ () => setEditing(true) }
        >
            Edit <span className="visually-hidden">{ props.title }</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={ () => props.deleteTodo(props.id) }>
            Delete <span className="visually-hidden">{ props.title }</span>
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