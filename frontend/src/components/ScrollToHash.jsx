// ScrollToHash.jsx - makes links like "/#articles" scroll smoothly to the section
// with that id, even when we arrive from /login or /signup.
// It renders nothing; it only runs an effect whenever the URL changes.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // small delay so the page sections exist in the DOM before we scroll
      const timer = setTimeout(() => {
        const section = document.getElementById(hash.slice(1));
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timer);
    }
    // No hash (e.g. just "/login") -> start at the top of the page
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
