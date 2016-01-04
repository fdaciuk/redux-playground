'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo-app';

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('app')
  );
};

store.subscribe(render);
render();
