import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import api from "../utils/api";
import styles from "../styles/Login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await api.post("/login", { email, password });
      router.push("/chat");
    } catch (error: any) {
      if (error.response?.data?.message) {
        const allowedMessages = [
          "There is no user with this e-mail.",
          "Invalid email address.",
          "Invalid password.",
          "Password must be at least 6 characters long.",
        ];

        if (allowedMessages.includes(error.response.data.message)) {
          alert(error.response.data.message);
        }
      } else {
        console.error(error);
        alert("Sign up error.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login | Chat Online</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2 className={styles.title}>Login</h2>
          <form onSubmit={handleLogin} className={styles.form}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
          <div className={styles.signupRedirect}>
            <p className={styles.redirectText}>Don't have an account?</p>
            <button
              onClick={() => router.push("/signup")}
              className={styles.signupButton}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
