// ============================================================
// data/content.js
// Keeps the website's DATA separate from the UI components.
// Components import these arrays and loop over them with .map()
// ============================================================

// List of featured articles shown in <FeaturedArticles />
export const articles = [
  {
    title: "Getting Started with React",
    description: "Learn components, JSX and the basics of building React applications.",
    rating: 5,
    author: "Lucky",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Understanding Node.js",
    description: "Explore server-side JavaScript and how Node.js supports web applications.",
    rating: 5,
    author: "Alex",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Introduction to Web Development",
    description: "Understand the technologies used to create modern interactive websites.",
    rating: 4.9,
    author: "Sarah",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  }
];

// List of featured tutorials shown in <FeaturedTutorials />
export const tutorials = [
  {
    title: "JavaScript Basics",
    description: "Build a strong foundation in variables, loops, functions and arrays.",
    rating: 5,
    author: "Lucky",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "React Components",
    description: "Learn how parent and child components work together in React.",
    rating: 5,
    author: "David",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Express.js Fundamentals",
    description: "Create the foundation of a backend application with Express.js.",
    rating: 4.9,
    author: "Emma",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
  }
];
