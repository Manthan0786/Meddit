"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostPayload } from "@/app/_services/posts";
import styles from "./createPost.module.css";
import { useSession } from "next-auth/react";

interface CreatePostProps {
  opened: boolean;
  onClose: () => void;
}

interface CreatePostFormData {
  title: string;
  description: string;
  savedFromSurgery: boolean;
  remedy: string[];
  author: string;
  avatar: string;
}

interface CreatePostProps {
  opened: boolean;
  onClose: () => void;
}
interface CreatePostError {
  title: string;
  description: string;
}

function CreatePost({ opened, onClose }: CreatePostProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    savedFromSurgery: false,
    remedy: [],
    author: "",
    avatar: "",
  });

  const handleClosePostModal = () => {
    onClose();
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      title: "",
      description: "",
    };
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    const user = session?.user;
    const payload = {
      ...formData,
      author: user?.name ?? "",
      avatar: user?.picture ?? user?.image ?? "",
    };
    const token = session?.backendToken ?? user?.Token;
    try {
      const data = await PostPayload(payload, token ?? "");
      if (data?.error) {
        console.error(data.error);
        return;
      }
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setFormData((prev: CreatePostFormData) => ({
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

      {/* Modal */}
      {opened && (
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

            <form
              onSubmit={(event) =>
                handleSubmit(
                  event as unknown as React.MouseEvent<HTMLFormElement>,
                )
              }
            >
              <div className={styles["form-group"]}>
                <label htmlFor="title" className={styles["form-label"]}>
                  Title
                </label>
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
                {errors.title && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.8rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.title}
                  </p>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>Your story</label>
                <textarea
                  className={styles["post-textarea"]}
                  placeholder="Share your journey..."
                  onChange={(event) =>
                    handleInputChange("description", event.target.value)
                  }
                  value={formData.description}
                />
                {errors.description && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.8rem",
                      marginTop: "4px",
                    }}
                  >
                    {errors.description}
                  </p>
                )}
              </div>
              <div
                className={`${styles["form-group"]} ${styles["remedy-section"]}`}
              >
                <label htmlFor="remedy-input" className={styles["form-label"]}>
                  Remedies followed
                </label>
                <input
                  className={styles["remedy-input"]}
                  id="remedy-input"
                  type="text"
                  value={inputValue}
                  placeholder="Type a remedy and press Enter"
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
                        aria-label={`Remove ${remedy}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
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
                  Publish post
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
