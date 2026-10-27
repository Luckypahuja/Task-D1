// FeaturedTutorials.jsx - the "Featured Tutorials" section (id="tutorials").
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import TutorialCard from "./TutorialCard";
import { tutorials } from "../data/content";

export default function FeaturedTutorials() {
  return (
    <section className="content-section alternate-section" id="tutorials">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Learn</p>
          <h2>Featured Tutorials</h2>
        </div>
        <Link to="/#tutorials" className="text-link">
          See all tutorials <ArrowRight size={17} />
        </Link>
      </div>

      <div className="card-grid">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.title} tutorial={tutorial} />
        ))}
      </div>

      <div className="mobile-see-more">
        <Link to="/#tutorials" className="secondary-button">See all tutorials</Link>
      </div>
    </section>
  );
}
