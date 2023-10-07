import React, { useState } from React;

export default function Todo(props) {

  const [newName, setNewName] = useState("");

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={ props.id }
          type="checkbox"
          defaultChecked={ props.completed }
          onChange={ () => props.toggleTaskCompleted(props.id) }
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
          ref={ editButtonRef }>
            Edit <span className="visually-hidden">{ props.name }</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={ () => props.deleteTask(props.id) }>
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