// TutorialCard.jsx - shows ONE tutorial. Receives the data through the "tutorial" prop.
import React from "react";
import { BookOpen } from "lucide-react";
import Rating from "./Rating";

export default function TutorialCard({ tutorial }) {
  return (
    <article className="content-card">
      <img src={tutorial.image} alt={tutorial.title} />
      <div className="card-body">
        <span className="card-type">
          <BookOpen size={15} /> Tutorial
        </span>
        <h3>{tutorial.title}</h3>
        <p>{tutorial.description}</p>
        <div className="card-meta">
          <Rating rating={tutorial.rating} />
          <span>{tutorial.author}</span>
        </div>
      </div>
    </article>
  );
}
