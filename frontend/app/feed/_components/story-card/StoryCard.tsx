import { useState } from "react";
import VoteButton from "../votebutton/VoteButton";

interface StoryCardProps {
  story: {
    id: number;
    title: string;
    excerpt: string;
    remedy: string;
    tags: string[];
    avatar: string;
    author: string;
    date: string;
    savedFromSurgery: boolean;
    upvotes: number;
    comments: number;
  };
  index: number;
}

type VoteDirection = "up" | "down" | null;

function StoryCard({ story, index }: StoryCardProps) {
  const [votes, setVotes] = useState(story.upvotes);
  const [userVote, setUserVote] = useState(null);

  const handleVote = (dir: VoteDirection) => {
    if (userVote === dir) {
      setVotes(story.upvotes);
      setUserVote(null);
    } else {
      const delta = dir === "up" ? 1 : -1;
      const prev = userVote === "up" ? 1 : userVote === "down" ? -1 : 0;
      setVotes(story.upvotes + delta - prev);
      setUserVote(dir);
    }
  };

  return (
    <article
      className="story-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Vote column */}
      <div className="vote-col">
        <VoteButton
          count={votes}
          direction="up"
          active={userVote === "up"}
          onClick={() => handleVote("up")}
        />
        <VoteButton
          count={0}
          direction="down"
          active={userVote === "down"}
          onClick={() => handleVote("down")}
        />
      </div>

      {/* Card body */}
      <div className="card-body">
        {/* Top row: tags + badge */}
        <div className="card-meta-top">
          <div className="tag-row">
            {story.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          {story.savedFromSurgery && (
            <span className="surgery-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Surgery avoided
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="card-title">
          <a href={`/stories/${story.id}`}>{story.title}</a>
        </h2>

        {/* Excerpt */}
        <p className="card-excerpt">{story.excerpt}</p>

        {/* Remedy pill */}
        <div className="remedy-row">
          <span className="remedy-label">Remedy used:</span>
          <span className="remedy-value">{story.remedy}</span>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <div className="author-row">
            <div className="avatar">{story.avatar}</div>
            <span className="author-name">{story.author}</span>
            <span className="dot-sep">·</span>
            <span className="post-date">{story.date}</span>
          </div>
          <div className="card-actions">
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {story.comments} comments
            </button>
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Share
            </button>
            <button className="action-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default StoryCard;
