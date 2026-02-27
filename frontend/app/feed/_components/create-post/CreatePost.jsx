"use client";

import { useState, useEffect } from "react";
import { PostPayload } from "@/app/_services/posts";
import styles from "./createPost.module.css";
import { useSession } from "next-auth/react";

function CreatePost() {
  const { data: session } = useSession();

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    savedFromSurgery: false,
    remedy: [],
    author: "",
    avatar: "",
  });

  useEffect(() => {
    if (session && session?.user) {
      setFormData((prev) => ({ ...prev, author: session.user.name }));
    }
  }, []);

  const handleOpenPostModal = () => {
    setOpenCreatePostModal(true);
  };

  const handleClosePostModal = () => {
    setOpenCreatePostModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formData };
    try {
      const data = await PostPayload(payload);
      console.log(data);
    } catch (error) {}
  };

  // Prevent background scroll
  useEffect(() => {
    if (openCreatePostModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCreatePostModal]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        remedy: [...prev.remedy, inputValue.trim()],
      }));
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      remedy: prev.remedy.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {/* Trigger */}
      <div
        className={styles["create-post-trigger"]}
        onClick={handleOpenPostModal}
      >
        Start a post...
      </div>

      {/* Modal */}
      {openCreatePostModal && (
        <div className={styles["modal-overlay"]} onClick={handleClosePostModal}>
          <div
            className={styles["modal-container"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-header"]}>
              <h2>Create a post</h2>
              <button
                className={styles["close-btn"]}
                onClick={handleClosePostModal}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="title">
                <input
                  id="title"
                  name="title"
                  placeholder="Give your story a title"
                  value={formData.title}
                  onChange={(event) =>
                    handleInputChange("title", event.target.value)
                  }
                  className={styles["title"]}
                />
              </label>
              <textarea
                className={styles["post-textarea"]}
                placeholder="Share your journey..."
                onChange={(event) =>
                  handleInputChange("description", event.target.value)
                }
                value={formData.description}
              />
              <label htmlFor="remedy-input">
                Remedies followed: {"\n"}
                <input
                  className={styles["remedy-input"]}
                  id="remedy-input"
                  type="text"
                  value={inputValue}
                  placeholder="Type remedy and press Enter"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className={styles["remedy-tags"]}>
                  {formData?.remedy?.map((remedy, index) => (
                    <span key={index} className={styles["remedy-tag"]}>
                      {remedy}
                      <button
                        type="button"
                        className={styles["remove-btn"]}
                        onClick={() => handleRemove(index)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </label>

              <div className={styles["checkbox-container"]}>
                <input
                  type="checkbox"
                  id="saved-from-surgery"
                  checked={formData.savedFromSurgery}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      savedFromSurgery: e.target.checked,
                    }))
                  }
                />
                <label htmlFor="saved-from-surgery">Saved from surgery?</label>
              </div>

              <div className={styles["modal-footer"]}>
                <button type="submit" className={styles["post-btn"]}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreatePost;
