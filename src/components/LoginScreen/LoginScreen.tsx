import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import styles from "./LoginScreen.module.css";
import { useAuthContext } from "../../states/AuthContext";

type Props = { onSuccess: () => void };

export default function LoginScreen({ onSuccess }: Props) {
  const { login, createAccount, authError, setAuthErr } = useAuthContext();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [create, setCreate] = useState<boolean>(false);

  useEffect(() => setAuthErr(""), [create]);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setAuthErr("");

    const email = name.trim();
    const pwd = password;

    try {
      if (create) await createAccount(email, pwd);
      else await login(email, pwd);
      onSuccess();
    } catch (e) {
      const errorMessage: string = e instanceof Error ? e.message : "Unknown error";
      setAuthErr(errorMessage);
    }
  };

  const handleCreateAccount = () => {
    setName("");
    setPassword("");
    setCreate((v) => !v);
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder={create ? "New Email" : "Email"}
          autoComplete="username"
        />
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
        />

        {authError ? <p className={styles.error}>{authError}</p> : null}

        <div className={styles.buttons}>
          <button type="button" onClick={handleCreateAccount}>
            {create ? "Cancel" : "Create Account"}
          </button>
          <button type="submit">{create ? "Create Account" : "Login"}</button>
        </div>
      </form>
    </section>
  );
}
