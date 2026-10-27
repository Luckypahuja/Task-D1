// About.jsx - the "About Me" profile section (id="about").
import React from "react";

export default function About() {
  return (
    <section className="profile-section" id="about">
      <div className="profile-image-wrapper">
        <img src="/image.png" alt="Lucky Pahuja" className="profile-image" />
      </div>
      <div className="profile-content">
        <p className="eyebrow">About Me</p>
        <h2>I'm Lucky Pahuja</h2>
        <p>
          I am a second-year AI/ML student interested in technology,
          software development and building real-world applications.
        </p>
        <div className="skills-list">
          <span>C++</span>
          <span>Python</span>
          <span>SQL</span>
          <span>Web Development</span>
          <span>Linux</span>
          <span>AI / ML</span>
        </div>
      </div>
    </section>
  );
}
