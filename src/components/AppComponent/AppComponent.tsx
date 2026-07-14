import { useEffect, useState } from "react";
import { useAuthContext } from "../../states/AuthContext";
import { TodosProvider } from "../../states/TodosContext";
import AppContent from "../AppContent/AppContent";
import LoginScreen from "../LoginScreen/LoginScreen";
import styles from "./AppComponent.module.css";

export default function AppComponent() {
  const { loggedIn, pageReady, logout } = useAuthContext();
  const [pageVisible, setPageVisible] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    requestAnimationFrame(() => setPageVisible(true));
  }, [])

  if (!pageReady) return (
    <main className={styles.beforePageVisible}>
      <h1 className={`${styles.beforePageVisibleHeader} ${pageVisible ? styles.beforePageVisibleHeader2 : ""}`}>Todo App</h1>
    </main>
  )

  return loggedIn ? (
    <TodosProvider>
      <AppContent handleLogout={handleLogout} />
    </TodosProvider>
  ) : (
    <LoginScreen onSuccess={() => {}} />
  );
}