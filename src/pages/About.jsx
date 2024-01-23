import React from "react";

const About = () => {
  return (
    <section className="dark:bg-slate-800 text-white font-sans py-16 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-8">About Us</h2>
        <p className="text-lg text-gray-300 mb-6">
          Welcome to Our Blog! Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed euismod justo eu diam accumsan, id volutpat
          libero fermentum. Sed interdum, libero ac eleifend accumsan, dui orci
          ultricies purus, nec feugiat elit lectus ac justo.
        </p>
        <p className="text-lg text-gray-300 mb-6">
          Our mission is to provide quality content and insights on various
          topics. Whether you are interested in technology, lifestyle, or
          personal development, we've got you covered.
        </p>
        <p className="text-lg text-gray-300">
          Feel free to explore our blog posts and don't hesitate to reach out if
          you have any questions or suggestions.
        </p>
      </div>
    </section>
  );
};

export default About;
