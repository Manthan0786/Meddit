import VoteButton from "./VoteButton";
import styles from "./storycard.module.css";

interface StoryCardProps {
  story: {
    id: number;
    title: string;
    content: string;
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

async function StoryCard({ story, index }: StoryCardProps) {
  return (
    <article
      className={styles.story_card}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Vote column */}
      <div className={styles.vote_col}>
        <VoteButton storyId={story.id} initialVotes={story.votes} />
      </div>

      {/* Card body */}
      <div className={styles.card_body}>
        {/* Top row: tags + badge */}
        <div className={styles.card_meta_top}>
          <div className={styles.tag_row}>
            {story.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          {story.savedFromSurgery && (
            <span className={styles.surgery_badge}>
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
        <h2 className={styles.card_title}>
          <a href={`/stories/${story.id}`}>{story.title}</a>
        </h2>

        {/* Excerpt */}
        <p className={styles.card_excerpt}>{story.content}</p>

        {/* Remedy pill */}
        <div className={styles.remedy_pill}>
          <span className={styles.remedy_label}>Remedy used:</span>
          <span className={styles.remedy_value}>{story.remedy}</span>
        </div>

        {/* Footer */}
        <div className={styles.card_footer}>
          <div className={styles.author_row}>
            <div className={styles.avatar}>{story.avatar}</div>
            <span className={styles.author_name}>{story.author}</span>
            <span className={styles.dot_sep}>·</span>
            <span className={styles.post_date}>{story.date}</span>
          </div>
          <div className={styles.card_actions}>
            <button className={styles.action_btn}>
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
            <button className={styles.action_btn}>
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
            <button className={styles.action_btn}>
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
