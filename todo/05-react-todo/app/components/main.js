'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import store from '../store';

const getVisibleTodos = (
  todos,
  filter
) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
  }
};

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if(currentFilter === filter) {
    return <span>{children}</span>;
  }

  return (
    <a href="#" onClick={(e) => {
      e.preventDefault();
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      });
    }}>
      { children }
    </a>
  );
};

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed
        ? 'line-through'
        : 'none'
  }}>
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo => {
      return (
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)} />
      );
    })}
  </ul>
);

let nextTodoId = 0;
const TodoApp = ({
  todos,
  visibilityFilter
}) => {
  let input;
  const visibleTodos = getVisibleTodos(todos, visibilityFilter);
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          text: input.value,
          id: nextTodoId++
        });
        input.value = '';
      }}>
        Add todo
      </button>
      <TodoList
        todos={visibleTodos}
        onTodoClick={(id) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
          })
        }}
      />
      <p>
        Show:
        {' '}
        <FilterLink 
          filter='SHOW_ALL'
          currentFilter={visibilityFilter}>
          All
        </FilterLink>
        {' '}
        <FilterLink 
          filter='SHOW_COMPLETED'
          currentFilter={visibilityFilter}>
          Completed
        </FilterLink>
        {' '}
        <FilterLink 
          filter='SHOW_ACTIVE'
          currentFilter={visibilityFilter}>
          Active
        </FilterLink>
      </p>
    </div>
  );
};

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />,
    document.getElementById('app')
  );
};

store.subscribe(render);
render();
