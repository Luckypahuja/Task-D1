// UserMenu.jsx - shown in the Navbar ONLY when a user is logged in.
// Shows: [account icon + name]
// Clicking it opens a dropdown with the name, email and the Logout button.
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // is the dropdown open?
  const menuRef = useRef(null);            // reference to the menu <div>

  // Show the saved NAME (never the email). Old accounts without a name show "User".
  const displayName = user.displayName || "User";

  // Close the dropdown when the user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setOpen(false);
    await logout();      // Firebase sign out
    navigate("/");       // go back to the home page
  }

  return (
    <div className="user-menu" ref={menuRef}>
      {/* Account icon + name (click to toggle the dropdown) */}
      <button
        type="button"
        className="user-button"
        onClick={() => setOpen(!open)}
        aria-label="Open account details"
        aria-expanded={open}
      >
        <UserCircle size={28} />
        <span className="user-name">{displayName}</span>
      </button>

      {/* Dropdown with name + email */}
      {open && (
        <div className="user-dropdown" role="dialog" aria-label="Account details">
          <UserCircle size={44} />
          <p className="dropdown-name">{displayName}</p>
          <p className="dropdown-email">{user.email}</p>

          {/* Logout is now INSIDE the profile dropdown */}
          <button type="button" className="nav-signup" onClick={handleLogout}>
            <LogOut size={16} />&nbsp;Logout
          </button>
        </div>
      )}

    </div>
  );
}
