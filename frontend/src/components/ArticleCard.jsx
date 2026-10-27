// ArticleCard.jsx - shows ONE article. Receives the data through the "article" prop.
import React from "react";
import { FileText } from "lucide-react";
import Rating from "./Rating";

export default function ArticleCard({ article }) {
  return (
    <article className="content-card">
      <img src={article.image} alt={article.title} />
      <div className="card-body">
        <span className="card-type">
          <FileText size={15} /> Article
        </span>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <div className="card-meta">
          <Rating rating={article.rating} />
          <span>{article.author}</span>
        </div>
      </div>
    </article>
  );
}
