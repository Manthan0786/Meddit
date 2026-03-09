"use client";

import { useState } from "react";
import styles from "./tabs.module.css";

const FILTER_TABS = ["Latest", "Top", "Rising", "Most Discussed"];

function Tabs() {
  const [activeTab, setActiveTab] = useState("Latest");

  return (
    <div className={styles.tabsWrapper}>
      {FILTER_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`${styles.filterTab}${
            activeTab === tab ? " " + styles.filterTabActive : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;

