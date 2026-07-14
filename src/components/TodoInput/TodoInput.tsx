import { useState } from "react";
import type { SubmitEvent } from "react";
import styles from "./TodoInput.module.css"
import { useTodosContext } from "../../states/TodosContext";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { addTodo } = useTodosContext();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;
    addTodo(trimmedText);
    setText("");
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          id="new-todo-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Todo Text..."
          rows={3}
        />
        <button className="input" type="submit">Add</button>
      </form>
    </section>
  );
}
