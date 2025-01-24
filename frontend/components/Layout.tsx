import React from "react";
import Head from "next/head";
import styles from "../styles/Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Chat Online</title>
        <meta name="description" content="Real time online chat" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <header>
        <nav>
          <h1 className={styles.HeaderAndFooter}>Welcome to the Chat Online!</h1>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p className={styles.HeaderAndFooter}>© 2025 Chat Online. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
