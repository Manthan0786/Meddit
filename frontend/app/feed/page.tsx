import Sidebar from "./_components/sidebar/SideBar";
import StoryCard from "./_components/story-card/StoryCard";
import Tabs from "./_components/tabs/Tabs";
import styles from "./feed.module.css";

const FILTER_TABS = ["Latest", "Top", "Rising", "Most Discussed"];

const STORIES = [
  {
    id: 1,
    title: "Avoided gallbladder surgery with a 3-week liver flush protocol",
    content:
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
    content:
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
    content:
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
    content:
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
    content:
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
  return (
    <>
      <div className={styles.feed_root}>
        <div className={styles.feed_container}>
          <div>
            <textarea
              className={styles.feed_textarea}
              placeholder="Share your story or ask a question..."
              rows={3}
            />
          </div>
          <div className={styles.feed_wrapper}>
            {/* Left: Feed */}
            <div className="feed-col">
              {/* Filter tabs */}
              <div className="filter-bar">
                <Tabs />
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
