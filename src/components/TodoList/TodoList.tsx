import { useState } from "react";
import { useTodosContext } from "../../states/TodosContext";
import type { Todo } from "../../types";
import ModifyTodo from "../ModifyTodo/ModifyTodo";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css"

export default function TodoList() {
  const [todoInModification, setTodoInModification] = useState<Todo | null>(null);
  const { todos, toggleTodo, deleteTodo, todosLoading, todosError } = useTodosContext();

  const setTodoForModification = (todo: Todo) => {
    document.body.style.overflow = "hidden";
    setTodoInModification(todo);
  }

  const endTodoModification = () => {
    document.body.style.overflow = "auto";
    setTodoInModification(null);
  }

  if (!(todosLoading || todosError) && (todos.length === 0)) return <p className={styles.noTodos}>No todos.</p>;

  return (
    <>
    { !(todosLoading || todosError) ?
      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            setTodoForModification={setTodoForModification}
          />
        ))}
      </ul>
      : todosLoading ?
      <p className={styles.noTodos}>Loading ...</p>
      :
      <p className={styles.noTodos}>{todosError}</p>
    }
    {todoInModification &&
      <ModifyTodo todo={todoInModification} endTodoModification={endTodoModification} />
    }
    </>
  );
}