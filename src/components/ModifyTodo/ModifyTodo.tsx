import { useState } from "react";
import type { MouseEvent } from "react";
import { useTodosContext } from "../../states/TodosContext";
import type { Todo } from "../../types";
import { formattedDateAndTime } from "../../utils/dateTime";
import todoItemStyles from "../TodoItem/TodoItem.module.css";
import styles from "./ModifyTodo.module.css"

type Props = {
  todo: Todo;
  endTodoModification: () => void;
};

export default function ModifyTodo({
  todo,
  endTodoModification
}: Props) {
    const [text, setText] = useState<string>(todo.text)
  const { modifyTodo } = useTodosContext();

  const handleModifyButton = () => {
    modifyTodo(todo.id, text.trim());
    endTodoModification();
  }

  const cancelModification = () => {
    endTodoModification();
  }

  return (
    <section className={styles.wrapper} onClick={cancelModification}>
        <section
          className={`${todoItemStyles.todoItem} ${styles.todoItem}`} onClick={(e: MouseEvent) => e.stopPropagation()}
        >
            <textarea className={`${todoItemStyles.todoText} 
              ${todo.completed ? todoItemStyles.itemCompleted : todoItemStyles.itemNotCompleted}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Todo Text..."
              rows={3}
            />
            <time className={`${todoItemStyles.time} ${styles.time}`} dateTime={(new Date(todo.id)).toISOString()}>
                {formattedDateAndTime(todo.id)}
            </time>
            <div className={todoItemStyles.todoButtons}>
              <div className={todoItemStyles.todoButtonItem}>
                <button disabled={(text.trim()).length ? false : true} onClick={handleModifyButton}>M</button>
              </div>
            </div>
        </section>
    </section>
  );
}