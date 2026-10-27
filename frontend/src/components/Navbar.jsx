// Navbar.jsx - fixed top bar: brand, page buttons, search bar and account area.
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserMenu from "./UserMenu";

// Navigation buttons (label + the section id they scroll to).
// Adding a new button later is just one more line here.
const navLinks = [
  { label: "Home", id: "home" },
  { label: "Articles", id: "articles" },
  { label: "Tutorials", id: "tutorials" },
  { label: "Projects", id: "projects" },
  { label: "About Me", id: "about" },
  { label: "Contact", id: "contact" },
];

// Words the search bar understands, mapped to a section id
const searchItems = [
  { id: "home", keywords: ["home", "homepage", "portfolio", "lucky pahuja", "main page"] },
  { id: "about", keywords: ["about", "about me", "profile", "skills", "c++", "python", "sql", "linux", "ai", "ml", "web development"] },
  { id: "articles", keywords: ["article", "articles", "react", "getting started with react", "node.js", "understanding node.js", "introduction to web development"] },
  { id: "tutorials", keywords: ["tutorial", "tutorials", "javascript", "javascript basics", "react components", "express.js", "express.js fundamentals"] },
  { id: "projects", keywords: ["project", "projects", "brd", "brd generator", "flappy bird", "game"] },
  { id: "newsletter", keywords: ["newsletter", "subscribe", "subscription", "stay updated"] },
  { id: "contact", keywords: ["contact", "support", "faqs", "faq", "help", "contact us"] },
  // Search for Membership and open the D1 pricing page
{
  id: "membership",keywords: ["membership", "pricing", "upgrade", "paid plan", "subscription plan"]
},
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, authLoading } = useAuth(); // logged-in user (null if logged out)

  function handleSearch(event) {
    event.preventDefault();
    const query = search.trim().toLowerCase();
    if (!query) return;

    // find the first section whose keywords match what was typed
    const match = searchItems.find((item) =>
      item.keywords.some(
        (keyword) =>
          keyword === query ||
          (query.length >= 3 && keyword.includes(query)) ||
          (keyword.length >= 3 && query.includes(keyword))
      )
    );

    if (!match) {
      window.alert("No matching content found. Try Home, Articles, Tutorials, Projects, About, or Contact.");
      return;
    }

    // Membership is a separate React route, not a section on the home page
if (match.id === "membership") {
  navigate("/pricing");
} else {
  // Other search results scroll to their home-page sections
  navigate(`/#${match.id}`);
}
  }

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link className="brand" to="/#home">DEV@Deakin</Link>

        {/* Navigation buttons */}
        <div className="nav-links">
  {navLinks.map((link) => (
    <Link key={link.id} to={`/#${link.id}`}>
      {link.label}
    </Link>
  ))}

  {/* Membership is displayed at the end of the navigation */}
  <Link to="/pricing">Membership</Link>
</div>

        {/* Search bar (kept from the original code) */}
        <form className="nav-search-form" onSubmit={handleSearch}>
          <input
            className="nav-search"
            type="search"
            placeholder="Search..."
            aria-label="Search website content"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit" className="nav-search-button">Search</button>
        </form>

        {/* Account area: changes depending on whether a user is logged in */}
        <div className="nav-actions">
          {authLoading ? null : user ? (
            <UserMenu />
          ) : (
            <>
              {/* Login uses the SAME class as Sign Up so both buttons look identical */}
              <Link to="/login" className="nav-signup">Login</Link>
              <Link to="/signup" className="nav-signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
