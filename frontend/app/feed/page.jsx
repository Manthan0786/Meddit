"use client";
import { useState } from "react";

const FILTER_TABS = ["Latest", "Top", "Rising", "Most Discussed"];
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
const STORIES = [
  {
    id: 1,
    title: "Avoided gallbladder surgery with a 3-week liver flush protocol",
    excerpt:
      "After my ultrasound showed multiple gallstones, my surgeon scheduled a cholecystectomy. I asked for 6 weeks to try alternatives. Here's exactly what I did — and why my follow-up scan shocked my doctor.",
    author: "Sara M.",
    avatar: "SM",
    date: "Feb 12, 2026",
    tags: ["Gallstones", "Liver Health"],
    upvotes: 1482,
    comments: 214,
    savedFromSurgery: true,
    remedy: "Liver flush + apple juice protocol",
    userVote: null,
  },
  {
    id: 2,
    title:
      "My herniated L4-L5 disc healed without spinal fusion — 18 month journey",
    excerpt:
      "Three neurosurgeons told me I needed surgery. I couldn't walk more than 50 meters. This is the full protocol of PT, inversion therapy, and diet changes that got me back to hiking.",
    author: "James R.",
    avatar: "JR",
    date: "Feb 10, 2026",
    tags: ["Herniated Disc", "Back Pain", "Spine"],
    upvotes: 2341,
    comments: 389,
    savedFromSurgery: true,
    remedy: "PT + inversion therapy + anti-inflammatory diet",
    userVote: null,
  },
  {
    id: 3,
    title:
      "Kidney stones passed naturally — what actually worked after 6 ER visits",
    excerpt:
      "5mm stone in my ureter, doctors wanted to go in with a ureteroscope. I begged for 2 more weeks. Hydration protocol, lemon juice, and one surprising supplement changed everything.",
    author: "Priya K.",
    avatar: "PK",
    date: "Feb 8, 2026",
    tags: ["Kidney Stones", "Urinary Health"],
    upvotes: 987,
    comments: 156,
    savedFromSurgery: true,
    remedy: "Hydration + lemon juice + chanca piedra",
    userVote: null,
  },
  {
    id: 4,
    title:
      "Appendix inflammation resolved without appendectomy — controversial but it happened",
    excerpt:
      "Admitted with appendicitis. Refused surgery, agreed to IV antibiotics. Six months later I'm fine. I know this isn't for everyone — but here's the full story and what my GI doctor says now.",
    author: "Tom W.",
    avatar: "TW",
    date: "Feb 5, 2026",
    tags: ["Appendicitis", "Antibiotics"],
    upvotes: 3105,
    comments: 541,
    savedFromSurgery: true,
    remedy: "IV antibiotics + strict monitoring protocol",
    userVote: null,
  },
  {
    id: 5,
    title:
      "Deviated septum — 2 years of breathwork before agreeing to septoplasty",
    excerpt:
      "This one didn't resolve without surgery, but I share it because the 2 years of nasal rinsing, myofunctional therapy, and sleep positioning dramatically improved my quality of life beforehand.",
    author: "Nadia F.",
    avatar: "NF",
    date: "Feb 3, 2026",
    tags: ["Deviated Septum", "ENT", "Breathwork"],
    upvotes: 432,
    comments: 88,
    savedFromSurgery: false,
    remedy: "Nasal rinses + myofunctional therapy",
    userVote: null,
  },
];

export default function MainFeed() {
  const [activeTab, setActiveTab] = useState("Latest");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        :root {
          --cream: #faf7f2;
          --warm-white: #fffefb;
          --sage: #4a7c59;
          --sage-light: #6a9f78;
          --sage-dark: #2e5239;
          --sage-pale: rgba(74,124,89,0.08);
          --earth: #8b6f47;
          --earth-pale: rgba(139,111,71,0.1);
          --text-primary: #1e2d1f;
          --text-secondary: #5a6b5b;
          --text-muted: #8a9e8c;
          --border: rgba(74,124,89,0.12);
          --border-light: rgba(74,124,89,0.07);
          --card-bg: #ffffff;
          --shadow-card: 0 1px 3px rgba(30,45,31,0.05), 0 4px 12px rgba(30,45,31,0.04);
          --shadow-hover: 0 4px 16px rgba(30,45,31,0.09), 0 1px 3px rgba(30,45,31,0.06);
          --radius: 14px;
          --radius-sm: 8px;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .feed-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          min-height: 100vh;
          padding-top: 88px;
        }

        /* ── PAGE WRAPPER ── */
        .feed-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px 64px;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 28px;
          align-items: start;
        }

        /* ── FILTER BAR ── */
        .filter-bar {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 6px;
          margin-bottom: 16px;
          box-shadow: var(--shadow-card);
        }

        .filter-tab {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 18px;
          border-radius: 9px;
          transition: all 0.2s ease;
          letter-spacing: 0.1px;
        }

        .filter-tab:hover {
          color: var(--sage-dark);
          background: var(--sage-pale);
        }

        .filter-tab.active {
          color: var(--sage-dark);
          background: var(--sage-pale);
          font-weight: 500;
        }

        /* ── STORY CARD ── */
        .story-card {
          display: flex;
          gap: 0;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-card);
          margin-bottom: 12px;
          overflow: hidden;
          transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
          animation: fadeSlideUp 0.4s ease both;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .story-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
          border-color: rgba(74,124,89,0.22);
        }

        /* ── VOTE COLUMN ── */
        .vote-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 16px 10px 16px 14px;
          gap: 4px;
          background: rgba(250,247,242,0.6);
          border-right: 1px solid var(--border-light);
          min-width: 56px;
        }

        .vote-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-muted);
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          transition: color 0.2s ease, background 0.2s ease;
          font-size: 11px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }

        .vote-btn:hover { color: var(--sage); background: var(--sage-pale); }
        .vote-btn.up.active { color: var(--sage); }
        .vote-btn.down.active { color: #c0553a; }

        .vote-count {
          font-size: 12px;
          font-weight: 500;
          color: inherit;
          margin-top: 1px;
        }

        /* ── CARD BODY ── */
        .card-body {
          flex: 1;
          padding: 16px 20px 14px;
          min-width: 0;
        }

        .card-meta-top {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .tag-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 11px;
          font-weight: 500;
          color: var(--sage-dark);
          background: var(--sage-pale);
          border: 1px solid rgba(74,124,89,0.15);
          padding: 3px 9px;
          border-radius: 999px;
          letter-spacing: 0.2px;
          text-transform: uppercase;
        }

        .surgery-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #5a7a3a;
          background: #eef5e6;
          border: 1px solid #c5dda8;
          padding: 3px 9px;
          border-radius: 999px;
          letter-spacing: 0.2px;
          margin-left: auto;
        }

        .card-title {
          font-family: 'Lora', serif;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.45;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .card-title a {
          text-decoration: none;
          color: inherit;
          transition: color 0.2s ease;
        }

        .card-title a:hover { color: var(--sage-dark); }

        .card-excerpt {
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.65;
          color: var(--text-secondary);
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .remedy-row {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--earth-pale);
          border: 1px solid rgba(139,111,71,0.15);
          border-radius: 7px;
          padding: 5px 11px;
          margin-bottom: 14px;
        }

        .remedy-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--earth);
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .remedy-value {
          font-size: 12px;
          font-weight: 400;
          color: #6b4f2a;
          font-style: italic;
        }

        /* ── CARD FOOTER ── */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .author-row {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--sage) 0%, var(--sage-dark) 100%);
          color: white;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 0.3px;
        }

        .author-name {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .dot-sep { color: var(--text-muted); font-size: 12px; }

        .post-date {
          font-size: 12px;
          color: var(--text-muted);
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 400;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          transition: color 0.2s ease, background 0.2s ease;
        }

        .action-btn:hover {
          color: var(--sage-dark);
          background: var(--sage-pale);
        }

        /* ── SIDEBAR ── */
        .sidebar {
          position: sticky;
          top: 96px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-cta {
          background: linear-gradient(145deg, var(--sage-dark) 0%, #1e3d28 100%);
          border-radius: var(--radius);
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(46,82,57,0.3);
        }

        .cta-icon {
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.12);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2px;
        }

        .cta-title {
          font-family: 'Lora', serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }

        .cta-desc {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.72);
          line-height: 1.55;
        }

        .cta-btn {
          display: inline-block;
          margin-top: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--sage-dark);
          background: #fff;
          padding: 9px 18px;
          border-radius: 9px;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }

        .cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.16);
        }

        .sidebar-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-card);
          overflow: hidden;
        }

        .sidebar-card-header {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 14px 16px 12px;
          border-bottom: 1px solid var(--border-light);
        }

        .trending-list {
          display: flex;
          flex-direction: column;
        }

        .trending-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          text-decoration: none;
          border-bottom: 1px solid var(--border-light);
          transition: background 0.2s ease;
        }

        .trending-item:last-child { border-bottom: none; }

        .trending-item:hover { background: var(--sage-pale); }

        .trending-rank {
          font-size: 18px;
          font-weight: 600;
          font-family: 'Lora', serif;
          color: var(--border);
          line-height: 1.2;
          min-width: 18px;
        }

        .trending-body {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .trending-title {
          font-size: 13px;
          font-weight: 400;
          color: var(--text-primary);
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .trending-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .trending-tag {
          font-size: 10.5px;
          font-weight: 500;
          color: var(--sage-dark);
          background: var(--sage-pale);
          padding: 2px 7px;
          border-radius: 999px;
        }

        .trending-votes {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* ── STATS ── */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border-light);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 14px 16px;
          background: var(--card-bg);
        }

        .stat-value {
          font-family: 'Lora', serif;
          font-size: 20px;
          font-weight: 600;
          color: var(--sage-dark);
        }

        .stat-label {
          font-size: 11px;
          font-weight: 400;
          color: var(--text-muted);
        }

        /* ── DISCLAIMER ── */
        .disclaimer {
          font-size: 11.5px;
          font-weight: 300;
          color: var(--text-muted);
          line-height: 1.6;
          padding: 0 4px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .feed-wrapper {
            grid-template-columns: 1fr;
          }
          .sidebar {
            position: static;
            order: -1;
          }
          .sidebar-cta { display: none; }
        }

        @media (max-width: 600px) {
          .feed-wrapper { padding: 20px 14px 48px; }
          .card-body { padding: 14px 14px 12px; }
          .vote-col { min-width: 48px; padding: 14px 8px 14px 10px; }
          .card-title { font-size: 15px; }
          .card-excerpt { display: none; }
          .surgery-badge { display: none; }
          .card-actions .action-btn:nth-child(3) { display: none; }
        }
      `}</style>

      <div className="feed-root">
        <div className="feed-wrapper">
          {/* Left: Feed */}
          <div className="feed-col">
            {/* Filter tabs */}
            <div className="filter-bar">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`filter-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Story cards */}
            {STORIES.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} />
            ))}
          </div>

          {/* Right: Sidebar */}
          <Sidebar />
        </div>
      </div>
    </>
  );
}

function StoryCard({ story, index }) {
  const [votes, setVotes] = useState(story.upvotes);
  const [userVote, setUserVote] = useState(null);

  const handleVote = (dir) => {
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

function Sidebar() {
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

function VoteButton({ count, direction, active, onClick }) {
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
