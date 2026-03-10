import styles from "./footer.module.css";

export default function Footer() {
  const navLinks = [
    { label: "Stories", href: "/feed" },
    { label: "Remedies", href: "/remedies" },
    { label: "Conditions", href: "/conditions" },
    { label: "Community", href: "/community" },
  ];

  return (
    <footer className="app_footer">
      <div className="app_footer_container">
        <div className={styles.footer_top}>
          <a href="/" className={styles.footer_logo}>
            Medify
          </a>
          <nav className={styles.footer_nav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.footer_link}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.footer_bottom}>
          <p className={styles.footer_copyright}>
            © {new Date().getFullYear()} Medify. Real stories, real remedies.
          </p>
          <div className={styles.footer_legal}>
            <a href="/privacy" className={styles.footer_legal_link}>
              Privacy
            </a>
            <a href="/terms" className={styles.footer_legal_link}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
