"use client";

import { useState } from "react";
import CreatePost from "./CreatePost";
import styles from "./createPost.module.css";

export default function CreatePostController() {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpenPostModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div
        className={styles["create-post-trigger"]}
        onClick={handleOpenPostModal}
      >
        Start a post...
      </div>
      {isOpen && (
        <CreatePost onClose={() => setIsOpen(false)} opened={isOpen} />
      )}
    </>
  );
}
