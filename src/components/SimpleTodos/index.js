import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening', completed: false},
  {id: 2, title: 'Rent the movie for tomorrow movie night', completed: false},
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    completed: false,
  },
  {id: 4, title: 'Drop the parcel at Bloomingdale', completed: false},
  {id: 5, title: 'Order fruits on Big Basket', completed: false},
  {id: 6, title: 'Fix the production issue', completed: false},
  {id: 7, title: 'Confirm my slot for Saturday Night', completed: false},
  {id: 8, title: 'Get essentials for Sunday car wash', completed: false},
]

class SimpleTodos extends Component {
  state = {todoList: initialTodosList, todoinput: ''}

  ondelete = userid => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== userid),
    }))
  }

  saveTodo = updatedItem => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === updatedItem.id ? updatedItem : todo,
      ),
    }))
  }

  toggleCompleted = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  settodo = event => {
    this.setState({todoinput: event.target.value})
  }

  addItem = () => {
    this.setState(prev => {
      const {todoinput, todoList} = prev

      if (!todoinput.trim()) return null

      const parts = todoinput.split(' ')
      const count = parseInt(parts[parts.length - 1])
      const title = Number.isNaN(count)
        ? todoinput
        : parts.slice(0, -1).join(' ')
      const newTodos = Array.from(
        {length: Number.isNaN(count) ? 1 : count},
        (_, i) => ({
          id: todoList.length + i + 1,
          title,
        }),
      )

      return {
        todoList: [...todoList, ...newTodos],
        todoinput: '',
      }
    })
  }

  render() {
    const {todoList, todoinput} = this.state
    return (
      <div className="main1container">
        <div className="mainContainer">
          <h1 className="heading">Simple Todos</h1>
          <div>
            <input
              className="textBox"
              type="text"
              value={todoinput}
              onChange={this.settodo}
            />
            <button className="btnAdd" type="button" onClick={this.addItem}>
              Add
            </button>
          </div>
          <ul>
            {todoList.map(todo => (
              <TodoItem
                key={todo.id}
                tododetails={todo}
                ondelete={this.ondelete}
                saveTodo={this.saveTodo}
                toggleCompleted={this.toggleCompleted}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
