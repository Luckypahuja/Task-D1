// Footer.jsx - footer shown at the bottom of every page (id="contact").
// <Link> is used instead of <a> so clicking does NOT reload the whole page.
import React from "react";
import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-grid">
        <div>
          <h3>DEV@Deakin</h3>
          <p>
            A student-focused platform for learning, sharing and building
            technology projects.
          </p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/#home">Home</Link>
          <Link to="/#articles">Articles</Link>
          <Link to="/#tutorials">Tutorials</Link>
          <Link to="/#projects">Projects</Link>
        </div>

        <div>
          <h4>Support</h4>
          <Link to="/#contact">FAQs</Link>
          <Link to="/#contact">Help</Link>
          <a href="mailto:lucky9132.ai25@chitkara.edu.in">Contact Us</a>
        </div>

        <div>
          <h4>Stay connected</h4>
          <div className="socials">
            <a href="https://github.com/Luckypahuja" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
          </div>
          <p className="contact-email">
            <Mail size={16} />
            lucky9132.ai25@chitkara.edu.in
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <strong>Lucky Pahuja — Portfolio</strong>
        <div>
          <Link to="/#contact">Privacy Policy</Link>
          <Link to="/#contact">Terms</Link>
          <Link to="/#contact">Code of Conduct</Link>
        </div>
      </div>
    </footer>
  );
}
