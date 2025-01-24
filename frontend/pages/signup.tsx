import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import styles from "../styles/Signup.module.css";
import Head from "next/head";

export default function SignupPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post("/signup", { username, email, password });
      alert(response.data.message);
      router.push("/");
    } catch (error: any) {
      if (error.response?.data?.message) {
        const allowedMessages = [
          "email already in use.",
          "Invalid email address.",
          "Username must be at least 3 characters long.",
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
      <title>Sign up | Chat Online</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
    </Head>
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <h2 className={styles.title}>Sign up</h2>
        <form onSubmit={handleSignup} className={styles.form}>
          <input
            type="text"
            placeholder="Username. Minimum of 3 characters."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
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
            placeholder="Password. Minimum of 6 characters."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.signupButton}>
            Sign up
          </button>
          <div className={styles.loginRedirect}>
            <p className={styles.redirectText}>Already have an account?</p>
            <button
              onClick={() => router.push("/")}
              className={styles.loginButton}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
