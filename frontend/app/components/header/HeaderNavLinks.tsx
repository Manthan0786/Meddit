"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

type NavLink = { label: string; href: string };

export default function HeaderNavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navlink} ${isActive ? styles.navlink_active : ""}`}
            style={isActive ? { fontWeight: 600, color: "var(--sage-dark)" } : undefined}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
