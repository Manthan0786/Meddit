"use client";

import { signIn, signOut } from "next-auth/react";
import styles from "./signin.module.css";

export function SignIn() {
  function handleSignIn() {
    signIn("google", { redirectTo: "/feed" });
  }

  return (
    <button onClick={handleSignIn} className={styles.sign_in_btn}>
      SignIn
    </button>
  );
}

export function SignOut() {
  function handleSignOut() {
    signOut();
  }

  return (
    <button onClick={handleSignOut} className={styles.sign_in_btn}>
      Sign out
    </button>
  );
}
