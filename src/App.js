import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Todo from './components/Todo';

const APIUrl = 'http://todo-api-course.herokuapp.com/999';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: [],
    };
    this.onAddToDo = this.onAddToDo.bind(this);
  }

  onAddToDo() {
    axios.post(APIUrl + '/todos', { text: this.state.newTodo })
    .then((response) => {
      const todos = this.state.todos;
      todos.push(response.data);
      this.setState({ todos: todos, newTodo: '' });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onRemoveTodo(TodoID) {
    axios.delete(APIUrl + '/todos/' + TodoID)
    .then((response) => {
      const todos = this.state.todos.filter((elem) => {
        return elem._id !== TodoID;
      });
      this.setState({ todos: todos });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  toggleToDo(ToDo) {
    axios.put(APIUrl + '/todos/' + ToDo._id, { completed: !ToDo.completed })
    .then((response) => {
      const todos = this.state.todos;
      const foundIndex = todos.findIndex(elem => elem._id === ToDo._id);
      todos[foundIndex].completed = !todos[foundIndex].completed;
      this.setState({
        todos: todos
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidMount() {
    axios.get(APIUrl + '/todos')
    .then((response) => {
      // console.log(response);
      this.setState({ todos: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const todos = this.state.todos.map((elem) => {
      return (
        <Todo
          key={elem._id}
          completed={elem.completed}
          onToggle={event => this.toggleToDo(elem)}
          onDelete={event => this.onRemoveTodo(elem._id)}
          text={elem.text}
        />
      );
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Lista de Tareas (To-Do App)</h2>
        </div>
        <div className="container main">
          <div className="row">
            <div className="col-lg-12">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese la tarea" value={this.state.newTodo}
                  onChange={event => {
                    this.setState({ newTodo: event.target.value })
                  }}
                  />
                <span className="input-group-btn">
                  <button className="btn btn-default" onClick={this.onAddToDo}>Enviar!</button>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="list-group list-container">
                {todos}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
