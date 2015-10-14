var React = require('react');

var TaskBox = React.createClass({
  
  render : function () {
    return (
      <header className="header">
        <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus={true}
            onKeyDown={this.props.handleNewTodoKeyDown}
          />
      </header>
    );
  }
});

var Item = React.createClass({

  render : function () {
    var completed = this.props.completed ? 'completed' : '';
    return (
      <li className={completed}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={this.props.toggleComplete} 
          />
          <label>{this.props.completed}</label>
          <button className="destroy" onClick={this.props.deleteTask} />
        </div>
      </li>  
    );
  }
});

var TodoApp = React.createClass({
  getInitialState : function() {
    return {items : []};
  },
  toggleComplete : function(item) {
    item.completed = !item.completed;
    this.setState(this.state);
  },
  deleteTask : function(item){
    this.state.items = this.state.items.filter( function(task) {
      return task != item;
    });
    this.setState(this.state.items);
  },
  handleNewTodoKeyDown : function(event) {
    var ENTER = 13;
    var taskName = event.target.value;
    if (event.keyCode == ENTER && taskName.length > 0) {
      this.state.items.push({
        completed : false,
        taskName : taskName
      });
      this.setState(this.state);
    }
  },
  render : function () {
    return (
      <div>
        <TaskBox 
          handleNewTodoKeyDown={this.handleNewTodoKeyDown}
        />
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
          />
          <ul className="todo-list">
            {this.state.items.map(function(item) {
              
              return (<Item
                completed={item.completed}
                taskName={item.taskName}
                toggleComplete={this.toggleComplete.bind(this,item)}
                deleteTask={this.deleteTask.bind(this,item)}
              />);
              })
            }
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>1</strong> 1 left
          </span>
          <ul className="filters">
            <li>
              <a href="#" className="selected">All</a>
            </li>
              <a href="#" className="">Active</a>
            <li>
              <a href="#" className="">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </div>  
    );
  }
});

module.exports = TodoApp;
