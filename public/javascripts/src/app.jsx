var React = require('react'),
  TodoApp = require('./todo-app.jsx');

React.render(
 <TodoApp />,
 document.getElementsByClassName('todoapp')[0]
);

