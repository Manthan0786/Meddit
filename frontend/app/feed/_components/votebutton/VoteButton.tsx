interface VoteButtonProps {
  count: number;
  direction: "up" | "down";
  active: boolean;
  onClick: () => void;
}

function VoteButton({ count, direction, active, onClick }: VoteButtonProps) {
  return (
    <button
      className={`vote-btn ${direction} ${active ? "active" : ""}`}
      onClick={onClick}
      aria-label={direction === "up" ? "Upvote" : "Downvote"}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        {direction === "up" ? (
          <path d="M12 4L3 15h6v5h6v-5h6L12 4z" fill="currentColor" />
        ) : (
          <path d="M12 20l9-11h-6V4H9v5H3l9 11z" fill="currentColor" />
        )}
      </svg>
      {direction === "up" && (
        <span className="vote-count">
          {count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count}
        </span>
      )}
    </button>
  );
}

export default VoteButton;
