import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Todo } from "../types";
import { AuthContext } from "./AuthContext";
import { API_BASE, fetchJSON } from "../utils/apiRequests";

type TodosContextValue = {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  modifyTodo: (id: number, newText: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  todosLoading: boolean;
  todosError: string;
};

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState<boolean>(true);
  const [todosError, setTodosError] = useState<string>("");
  const auth = useContext(AuthContext);

  const loadTodos = async () => {
    if (!todos.length) setTodosLoading(true);
    try {
      const data: Todo[] = await fetchJSON<Todo[]>(`${API_BASE}/todos`, {
        credentials: "include",
      });
      setTodos(data);
      setTodosError("");
    }
    catch (e) {
      const errorMessage: string = e instanceof Error ? e.message : "Unknown error";
      setTodosError(errorMessage);
    }
    finally {
      setTodosLoading(false);
    }
  };

  useEffect(() => {
    if (!auth?.pageReady) return;
    loadTodos().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.pageReady]);

  const addTodo = async (text: string) => {
    await fetchJSON(`${API_BASE}/todos`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    await loadTodos();
  };

  const toggleTodo = async (id: number) => {
    await fetchJSON(`${API_BASE}/todos/${id}/toggle`, {
      method: "POST",
      credentials: "include",
    });
    await loadTodos();
  };

  const modifyTodo = async (id: number, newText: string) => {
    await fetchJSON(`${API_BASE}/todos/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });
    await loadTodos();
  };

  const deleteTodo = async (id: number) => {
    await fetchJSON(`${API_BASE}/todos/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    await loadTodos();
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, toggleTodo, modifyTodo, deleteTodo, todosLoading, todosError }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodosContext() {
  const v = useContext(TodosContext);
  if (!v) throw new Error("No TodosContext.");
  return v;
}
