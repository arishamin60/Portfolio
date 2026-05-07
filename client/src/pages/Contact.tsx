/**
 * Contact Page
 * Modern Minimalist Design: Centered form with soft background container
 * Features controlled inputs, validation, inline error messages, and loading states
 */

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, PORTFOLIO_CONFIG.timing.contactFormSubmitDelay)
      );
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), PORTFOLIO_CONFIG.timing.successMessageDuration);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 md:py-32">
      <div className="container">
        <div className="mb-16 text-center fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Get In <span className="accent-underline">Touch</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="bg-card border border-border rounded-lg p-6 card-hover fade-in" style={{ animationDelay: "100ms" }}>
            <Mail className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-bold text-primary mb-2">Email</h3>
            <p className="text-foreground/70">{PORTFOLIO_CONFIG.contact.email}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 card-hover fade-in" style={{ animationDelay: "200ms" }}>
            <Phone className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-bold text-primary mb-2">Phone</h3>
            <p className="text-foreground/70">{PORTFOLIO_CONFIG.contact.phone}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 card-hover fade-in" style={{ animationDelay: "300ms" }}>
            <MapPin className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-bold text-primary mb-2">Location</h3>
            <p className="text-foreground/70">{PORTFOLIO_CONFIG.contact.location}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto fade-in" style={{ animationDelay: "400ms" }}>
          <div className="bg-card border border-border rounded-lg p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-foreground/70">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`rounded-lg border-2 transition-colors ${
                      errors.name
                        ? "border-destructive focus:border-destructive"
                        : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1 font-medium">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`rounded-lg border-2 transition-colors ${
                      errors.email
                        ? "border-destructive focus:border-destructive"
                        : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1 font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={5}
                    className={`rounded-lg border-2 transition-colors resize-none ${
                      errors.message
                        ? "border-destructive focus:border-destructive"
                        : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1 font-medium">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-300 py-6 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
