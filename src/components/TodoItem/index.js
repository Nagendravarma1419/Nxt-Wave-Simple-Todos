import {useState} from 'react'
import './index.css'

const TodoItem = ({tododetails, ondelete, saveTodo, toggleCompleted}) => {
  const {id, title, completed} = tododetails
  const [isEditing, setEditingStatus] = useState(false)
  const [inputValue, setInputValue] = useState(title)

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const saveEdit = () => {
    if (inputValue.trim() !== '') {
      const updatedTodo = {id, title: inputValue, completed}
      saveTodo(updatedTodo)
    }
    setEditingStatus(false)
  }

  const toggleEdit = () => {
    if (isEditing) {
      saveEdit()
    } else {
      setEditingStatus(true)
    }
  }

  return (
    <li className="totdoItem">
      <div className="todoContent">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
        {isEditing ? (
          <input type="text" onChange={handleInputChange} value={inputValue} />
        ) : (
          <p className="para">{title}</p>
        )}
      </div>
      <div className="btnContainer">
        <button className="btnstyle" type="button" onClick={toggleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button className="btnstyle" type="button" onClick={() => ondelete(id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
