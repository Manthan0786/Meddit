"use client";

import { useState } from "react";
import Sidebar from "./_components/sidebar/SideBar";
import StoryCard from "./_components/story-card/StoryCard";
import "./page.css";

const FILTER_TABS = ["Latest", "Top", "Rising", "Most Discussed"];

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
        <div className="feed-container">
          <div>
            <textarea
              className="feed-textarea"
              placeholder="Share your story or ask a question..."
              rows={3}
            />
          </div>
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
      </div>
    </>
  );
}
