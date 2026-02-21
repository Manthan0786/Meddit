"use client";

import { signIn } from "next-auth/react";
import styles from "./signin.module.css";

export default function SignIn() {
  function handleSignIn() {
    signIn("google", { redirectTo: "/feed" });
  }
  return (
    <button onClick={handleSignIn} className={styles.sign_in_btn}>
      SignIn
    </button>
  );
}
