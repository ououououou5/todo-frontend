import TodoInput from "../TodoInput/TodoInput";
import TodoList from "../TodoList/TodoList";
import styles from "./AppContent.module.css";

type Props = {
    handleLogout: () => void;
}

export default function AppContent({handleLogout} : Props) {

  return (
    <main className={styles.mainContainer}>
      <header className={styles.header}>
        <h1 className={styles.mainHeader}>Todo App</h1>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </header>
      <TodoInput />
      <TodoList />
      <footer className={styles.footer}>
        <p>A simple Todo App made by Ondrej Urban in 2026</p>
      </footer>
    </main>
  );
}
