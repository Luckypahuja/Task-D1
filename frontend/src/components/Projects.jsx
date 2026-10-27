// Projects.jsx - the "Featured Projects" section (id="projects").
import React from "react";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Build</p>
          <h2>Featured Projects</h2>
        </div>
      </div>

      <div className="project-grid">
        <article className="project-card">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80"
            alt="Business planning project"
          />
          <div>
            <h3>BRD Generator</h3>
            <p>
              A project that helps startup founders turn ideas into structured
              business requirements and explore important business questions.
            </p>
            <a href="https://github.com/Luckypahuja" target="_blank" rel="noreferrer">
              GitHub Repository <ArrowRight size={17} />
            </a>
          </div>
        </article>

        <article className="project-card">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80"
            alt="Game development project"
          />
          <div>
            <h3>Flappy Bird</h3>
            <p>
              A Flappy Bird style game created in C# using the SplashKit
              visualization library.
            </p>
            <a href="https://github.com/Luckypahuja" target="_blank" rel="noreferrer">
              GitHub Profile <ArrowRight size={17} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
