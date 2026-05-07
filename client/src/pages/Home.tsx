/**
 * Home Page - Single Page Application
 * All sections integrated on one page with smooth scroll navigation
 * Sections: Hero, About, Projects, Contact, Testimonials
 */

import { Hero } from "../components/Hero";
import { Testimonials } from "../components/Testimonials";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-20">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="scroll-mt-20">
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>
    </div>
  );
}
