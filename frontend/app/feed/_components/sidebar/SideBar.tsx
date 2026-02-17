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
    <aside className="sidebar">
      {/* CTA Box */}
      <div className="sidebar-cta">
        <div className="cta-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C10.3 3 9 4.3 9 6V9H6C4.3 9 3 10.3 3 12C3 13.7 4.3 15 6 15H9V18C9 19.7 10.3 21 12 21C13.7 21 15 19.7 15 18V15H18C19.7 15 21 13.7 21 12C21 10.3 19.7 9 18 9H15V6C15 4.3 13.7 3 12 3Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>
        <h3 className="cta-title">Did a remedy save you from surgery?</h3>
        <p className="cta-desc">
          Your story could help thousands of people facing the same decision.
        </p>
        <a href="/share" className="cta-btn">
          Share your story
        </a>
      </div>

      {/* Trending */}
      <div className="sidebar-card">
        <div className="sidebar-card-header">
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
        <div className="trending-list">
          {TRENDING.map((item, i) => (
            <a
              key={item.id}
              href={`/stories/${item.id}`}
              className="trending-item"
            >
              <span className="trending-rank">{i + 1}</span>
              <div className="trending-body">
                <span className="trending-title">{item.title}</span>
                <div className="trending-meta">
                  <span className="trending-tag">{item.tag}</span>
                  <span className="trending-votes">
                    ↑ {item.upvotes.toLocaleString()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="sidebar-card stats-card">
        <div className="sidebar-card-header">
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
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-value">14,820</span>
            <span className="stat-label">Stories shared</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">9,340</span>
            <span className="stat-label">Surgeries avoided</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">87k</span>
            <span className="stat-label">Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">142</span>
            <span className="stat-label">Conditions covered</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="disclaimer">
        ⚕️ Stories shared here are personal experiences, not medical advice.
        Always consult a qualified healthcare professional before changing your
        treatment plan.
      </p>
    </aside>
  );
}

export default Sidebar;
