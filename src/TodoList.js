import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addTodo, fetchTodos } from "./store/actions";

import TodoItem from "./TodoItem.js";

const TodoList = (props) => {
  const { todos, fetchTodos, addTodo } = props;
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <>
      <form className="mb" onSubmit={handleFormSubmit} data-testid="form-add">
        <input
          data-testid="input-form-add"
          type="text"
          value={newTodo}
          onChange={handleNewTodoChange}
          placeholder="Enter your todo"
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>
      <p>Your todos</p>
      <div data-testid ="list-todo-container" >
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = ({ todos }) => ({ todos });
const mapDispatchToProps = (dispatch) => ({
  addTodo: (title) => dispatch(addTodo(title)),
  fetchTodos: () => dispatch(fetchTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
