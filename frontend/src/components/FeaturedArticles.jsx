// FeaturedArticles.jsx - the "Featured Articles" section (id="articles").
// Loops over the articles array and renders one <ArticleCard /> for each.
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ArticleCard from "./ArticleCard";
import { articles } from "../data/content";

export default function FeaturedArticles() {
  return (
    <section className="content-section" id="articles">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Discover</p>
          <h2>Featured Articles</h2>
        </div>
        <Link to="/#articles" className="text-link">
          See all articles <ArrowRight size={17} />
        </Link>
      </div>

      <div className="card-grid">
        {articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>

      <div className="mobile-see-more">
        <Link to="/#articles" className="secondary-button">See all articles</Link>
      </div>
    </section>
  );
}
