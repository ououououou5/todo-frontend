import type { Todo } from "../../types";
import { formattedDateAndTime } from "../../utils/dateTime";
import styles from "./TodoItem.module.css";

type Props = {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setTodoForModification: (todo: Todo) => void;
};

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  setTodoForModification,
}: Props) {

  return (
    <li
      className={styles.todoItem}
    >
        <p className={`${styles.todoText} 
          ${todo.completed ? styles.itemCompleted : styles.itemNotCompleted}`}
        >
          {todo.text}
          <time className={styles.time} dateTime={(new Date(todo.id)).toISOString()}>
            {formattedDateAndTime(todo.id)}
        </time>
        </p>
        <div className={styles.todoButtons}>
          <div className={styles.todoButtonItem}>
            <button onClick={() => toggleTodo(todo.id)}>D</button>
          </div>
          <div className={styles.todoButtonItem}>
            <button onClick={() => setTodoForModification(todo)}>M</button>
          </div>
          <div className={styles.todoButtonItem}>
            <button onClick={() => deleteTodo(todo.id)}>X{/*🗑️*/}</button>
          </div>
        </div>
      {/*
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>X</button>
      */}
    </li>
  );
}