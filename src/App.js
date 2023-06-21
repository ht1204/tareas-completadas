import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, name: 'Sacar la ropa', done: false },
        { id: 2, name: 'Hacer la cama', done: true },
        { id: 3, name: 'Leer un rato', done: false },
      ],
      newTask: '',
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({
      newTask: event.target.value,
    });
  };

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.createNewTask();
    }
  }

  createNewTask = () => {
    const { tasks, newTask } = this.state;
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: tasks.length + 1,
        name: newTask,
        done: false,
      };

      this.setState({
        tasks: [...tasks, newTaskObject],
        newTask: '',
      });
    }
  };

  toggleTask(id) {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    this.setState({
      tasks: updatedTasks,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map((task, index) => (
              <li
                key={task.id}
                onClick={() => this.toggleTask(task.id)}
                className={task.done ? 'done' : ''}
              >
                {task.name}
              </li>
            ))}
          </ul>
          <form onSubmit={this.createNewTask}>
            <input
              type="text"
              id="new-task"
              placeholder="Ingresa una tarea y oprime Enter"
              value={this.state.newTask}
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              className={this.state.newTask.trim() === '' ? 'error' : ''}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
