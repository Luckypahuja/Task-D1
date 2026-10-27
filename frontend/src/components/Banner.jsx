// Banner.jsx - the big hero banner at the top of the home page (id="home").
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">MY PORTFOLIO</p>
        <h1>Hi, I'm Lucky Pahuja.</h1>
        <p>
          AI/ML student and developer interested in software development,
          data, artificial intelligence and building practical projects.
        </p>
        <div className="hero-buttons">
          <Link to="/#articles" className="primary-button">
            Explore Articles <ArrowRight size={18} />
          </Link>
          <Link to="/#tutorials" className="secondary-button">
            View Tutorials
          </Link>
        </div>
      </div>
    </section>
  );
}
