// HomePage.jsx - puts all the home-page sections together in order.
import React from "react";
import Banner from "./Banner";
import About from "./About";
import FeaturedArticles from "./FeaturedArticles";
import FeaturedTutorials from "./FeaturedTutorials";
import Projects from "./Projects";
import Newsletter from "./Newsletter";

export default function HomePage() {
  return (
    <main>
      <Banner />
      <About />
      <FeaturedArticles />
      <FeaturedTutorials />
      <Projects />
      <Newsletter />
    </main>
  );
}
