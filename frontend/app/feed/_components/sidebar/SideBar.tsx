import styles from "./sidebar.module.css";

function Sidebar() {
  const TRENDING = [
    {
      id: 1,
      title: "Rotator cuff tear: 14 months of PT vs. surgery",
      upvotes: 4210,
      tag: "Shoulder",
    },
    {
      id: 2,
      title: "Uterine fibroids shrunk with castor oil packs",
      upvotes: 3887,
      tag: "Women's Health",
    },
    {
      id: 3,
      title: "Carpal tunnel resolved — no surgery in 2 years",
      upvotes: 2654,
      tag: "Nerve",
    },
    {
      id: 4,
      title: "How I reversed my cataract progression naturally",
      upvotes: 1923,
      tag: "Vision",
    },
    {
      id: 5,
      title: "Varicose veins: compression therapy success story",
      upvotes: 1541,
      tag: "Vascular",
    },
  ];
  return (
    <aside className={styles.sidebar}>
      {/* CTA Box */}
      <div className={styles.sidebarCta}>
        <div className={styles.ctaIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C10.3 3 9 4.3 9 6V9H6C4.3 9 3 10.3 3 12C3 13.7 4.3 15 6 15H9V18C9 19.7 10.3 21 12 21C13.7 21 15 19.7 15 18V15H18C19.7 15 21 13.7 21 12C21 10.3 19.7 9 18 9H15V6C15 4.3 13.7 3 12 3Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>
        <h3 className={styles.ctaTitle}>
          Did a remedy save you from surgery?
        </h3>
        <p className={styles.ctaDesc}>
          Your story could help thousands of people facing the same decision.
        </p>
        <a href="/share" className={styles.ctaBtn}>
          Share your story
        </a>
      </div>

      {/* Trending */}
      <div className={styles.sidebarCard}>
        <div className={styles.sidebarCardHeader}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Trending this week</span>
        </div>
        <div className={styles.trendingList}>
          {TRENDING.map((item, i) => (
            <a
              key={item.id}
              href={`/stories/${item.id}`}
              className={styles.trendingItem}
            >
              <span className={styles.trendingRank}>{i + 1}</span>
              <div className={styles.trendingBody}>
                <span className={styles.trendingTitle}>{item.title}</span>
                <div className={styles.trendingMeta}>
                  <span className={styles.trendingTag}>{item.tag}</span>
                  <span className={styles.trendingVotes}>
                    ↑ {item.upvotes.toLocaleString()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className={`${styles.sidebarCard} ${styles.statsCard}`}>
        <div className={styles.sidebarCardHeader}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Community stats</span>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>14,820</span>
            <span className={styles.statLabel}>Stories shared</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>9,340</span>
            <span className={styles.statLabel}>Surgeries avoided</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>87k</span>
            <span className={styles.statLabel}>Members</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>142</span>
            <span className={styles.statLabel}>Conditions covered</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        ⚕️ Stories shared here are personal experiences, not medical advice.
        Always consult a qualified healthcare professional before changing your
        treatment plan.
      </p>
    </aside>
  );
}

export default Sidebar;
