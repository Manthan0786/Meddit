"use client";

import { useState } from "react";
import { voteOnPost } from "../../../_services/posts";

type Props = {
  storyId: number;
  initialVotes: number;
  backendToken: string;
};

type VoteDirection = "up" | "down";

import styles from "./storycard.module.css";

export default function VoteButton({
  storyId,
  initialVotes,
  backendToken,
}: Props) {
  const [votes, setVotes] = useState<number>(initialVotes);
  const [userVote, setUserVote] = useState<VoteDirection | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (dir: VoteDirection) => {
    if (isLoading) return;

    if (userVote === dir) {
      // For pessimistic updates, do nothing on second click until backed by API decision.
      return;
    }

    try {
      setIsLoading(true);
      const data = await voteOnPost(storyId, dir, backendToken);
      if (typeof data?.totalVotes === "number") {
        setVotes(data.totalVotes);
        setUserVote(dir);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update vote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.vote_widget} aria-label="Vote on story">
      <button
        type="button"
        className={`${styles.vote_button} ${
          userVote === "up" ? styles.vote_button_active_up : ""
        }`}
        onClick={() => handleVote("up")}
        disabled={isLoading}
        aria-pressed={userVote === "up"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5l7 7H5l7-7z" fill="currentColor" />
        </svg>
      </button>
      <div className={styles.vote_count}>
        {isLoading ? <span className={styles.vote_spinner} /> : votes}
      </div>
      <button
        type="button"
        className={`${styles.vote_button} ${
          userVote === "down" ? styles.vote_button_active_down : ""
        }`}
        onClick={() => handleVote("down")}
        disabled={isLoading}
        aria-pressed={userVote === "down"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19l-7-7h14l-7 7z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
