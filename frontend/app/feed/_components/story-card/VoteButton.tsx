"use client";

import { useState } from "react";

type Props = {
  storyId: Number;
  initialVotes: Number;
};

type VoteDirection = "up" | "down" | null;

export default function VoteButton({ storyId, initialVotes }: Props) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(null);

  //   async function handleVote() {
  //     setVotes((v) => v + 1);

  //     await fetch("/api/vote", {
  //       method: "POST",
  //       body: JSON.stringify({ storyId }),
  //     });
  //   }

  //   const handleVote = (dir: VoteDirection) => {
  //     if (userVote === dir) {
  //       setVotes(story.upvotes);
  //       setUserVote(null);
  //     } else {
  //       const delta = dir === "up" ? 1 : -1;
  //       const prev = userVote === "up" ? 1 : userVote === "down" ? -1 : 0;
  //       setVotes(story.upvotes + delta - prev);
  //       setUserVote(dir);
  //     }
  //   };

  return (
    <>
      <button>👍 {votes}</button>
      <button>👎</button>
    </>
  );
}
