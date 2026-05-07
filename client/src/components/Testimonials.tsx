/**
 * Testimonials Component
 * Displays client testimonials and social proof
 */

import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Startup Inc",
    text: "Arish delivered an exceptional website that exceeded our expectations. The attention to detail and clean code made future updates seamless.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "Digital Solutions Co",
    text: "Working with Arish was a game-changer for our business. The portfolio site he built has significantly improved our client conversions.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Agency",
    text: "Arish's combination of technical skills and design sensibility is rare. He understood our vision and brought it to life beautifully.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30 border-y border-border">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            What <span className="accent-underline">Clients Say</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working together.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-lg p-6 card-hover fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-bold text-primary">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
