import "./header.css";

function Header() {
  const navLinks = [
    { label: "Stories", href: "/stories" },
    { label: "Remedies", href: "/remedies" },
    { label: "Conditions", href: "/conditions" },
    { label: "Community", href: "/community" },
  ];

  return (
    <>
      <header className="header">
        <div className="logo-navlinks-container">
          <a href="/" className="logo">
            <div className="logo-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3C10.3 3 9 4.3 9 6V9H6C4.3 9 3 10.3 3 12C3 13.7 4.3 15 6 15H9V18C9 19.7 10.3 21 12 21C13.7 21 15 19.7 15 18V15H18C19.7 15 21 13.7 21 12C21 10.3 19.7 9 18 9H15V6C15 4.3 13.7 3 12 3Z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <path
                  d="M12 7C11.4 7 11 7.4 11 8V10C11 10.6 10.6 11 10 11H8C7.4 11 7 11.4 7 12C7 12.6 7.4 13 8 13H10C10.6 13 11 13.4 11 14V16C11 16.6 11.4 17 12 17C12.6 17 13 16.6 13 16V14C13 13.4 13.4 13 14 13H16C16.6 13 17 12.6 17 12C17 11.4 16.6 11 16 11H14C13.4 11 13 10.6 13 10V8C13 7.4 12.6 7 12 7Z"
                  fill="white"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
            <div className="logo-text">Medify</div>
          </a>
          <nav className="navlinks">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="navlink">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
