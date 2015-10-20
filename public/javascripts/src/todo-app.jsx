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
          <label>{this.props.taskName}</label>
          <button className="destroy" onClick={this.props.deleteTask} />
        </div>
      </li>  
    );
  }
});

var TodoApp = React.createClass({
  getInitialState : function() {
    return {
        filter: 'all',
        items : []
    };
  },
  selectFilter : function(filter) {
    this.state.filter = filter;
    this.setState(this.state);
  },
  clearCompleted : function(){
    this.state.items = this.state.items.filter(function(item){
      return item.completed == false;
    });
    this.setState(this.state);
  },
  toggleComplete : function(item) {
    item.completed = !item.completed;
    this.setState(this.state);
  },
  deleteTask : function(item){
    this.state.items = this.state.items.filter( function(task) {
      return task !== item;
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
    
    switch(this.state.filter){
      case 'all':
        var showing = this.state.items;
        break;
      case 'active':
        var showing = this.state.items.filter(function(task){
          return !task.completed;
        });
        break;
      case 'completed':
        var showing = this.state.items.filter(function(task){
          return task.completed;
        });
        break;
    }

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
            {showing.map(function(item, i){ 
              var toggleComplete = this.toggleComplete.bind(this,item);
              var deleteTask = this.deleteTask.bind(this,item);
              return (<Item
                completed={item.completed}
                taskName={item.taskName}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
                key={i}
              />);
              }, this)}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{this.state.items.filter(function(task){
              return !task.completed;
            }).length} / 
            </strong> {this.state.items.length}
          </span>
          <ul className="filters">
            <li>
              <a href="#" className={this.state.filter=='all'?'selected':''} onClick={this.selectFilter.bind(this,'all')}>All</a>
            </li>
              <a href="#" className={this.state.filter=='active'?'selected':''} onClick={this.selectFilter.bind(this, 'active')}>Active</a>
            <li>
              <a href="#" className={this.state.filter=='completed'?'selected':''} onClick={this.selectFilter.bind(this, 'completed')}>Completed</a>
            </li>
          </ul>
          <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
        </footer>
      </div>  
    );
  }
});

module.exports = TodoApp;
