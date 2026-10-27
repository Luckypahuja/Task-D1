// Rating.jsx - small reusable star + number, used inside article & tutorial cards
import React from "react";
import { Star } from "lucide-react";

export default function Rating({ rating }) {
  return (
    <div className="rating">
      <Star size={16} fill="currentColor" />
      <span>{rating}</span>
    </div>
  );
}
