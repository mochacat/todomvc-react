var React = require('react'),
  ReactDOM = require('react-dom'),
  TodoApp = require('./todo-app.jsx');

ReactDOM.render(
 <TodoApp />,
 document.getElementsByClassName('todoapp')[0]
);

