"use client";

import { useState } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Latest");
  const FILTER_TABS = ["Latest", "Top", "Rising", "Most Discussed"];
  return (
    <>
      <div className="tabs-wrapper">
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
    </>
  );
}

export default Tabs;
