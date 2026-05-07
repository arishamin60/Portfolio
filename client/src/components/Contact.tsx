/**
 * Contact Component - Enhanced with Glassmorphism & Glow Effects
 * Centered glassmorphism card with frosted inputs and glowing button hover effects
 * Integrated with EmailJS for form submission
 */

import { Button } from ".//ui/button";
import { Input } from ".//ui/input";
import { Textarea } from ".//ui/textarea";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { getEmailJSConfig, isEmailJSConfigured } from "../lib/emailjs-config";
import { Mail, Phone, MapPin, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailJSReady, setEmailJSReady] = useState(false);
  const [emailJSError, setEmailJSError] = useState<string | null>(null);

  // Initialize EmailJS on component mount
  useEffect(() => {
    const initializeEmailJS = async () => {
      try {
        // Dynamically import EmailJS
        const emailjs = await import("@emailjs/browser");
        
        const config = getEmailJSConfig();
        if (!config.isConfigured) {
          setEmailJSError(config.error || "EmailJS not configured");
          console.warn("EmailJS Configuration:", config.error);
          return;
        }

        // Initialize EmailJS with public key
        emailjs.init(config.publicKey);
        setEmailJSReady(true);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to initialize EmailJS";
        setEmailJSError(errorMessage);
        console.error("EmailJS initialization error:", error);
      }
    };

    initializeEmailJS();
  }, []);

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
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!emailJSReady) {
        throw new Error("EmailJS is not initialized. Please check your configuration.");
      }

      const emailjs = await import("@emailjs/browser");
      const config = getEmailJSConfig();

      // Send email using EmailJS
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: PORTFOLIO_CONFIG.contact.email,
        },
        config.publicKey
      );

      console.log("Form submitted successfully:", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again.";
      setSubmitError(errorMessage);
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-background py-20 md:py-32">
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              Get In <span className="accent-underline">Touch</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Configuration Warning (Development Only) */}
          {emailJSError && process.env.NODE_ENV === "development" && (
            <motion.div
              variants={itemVariants}
              className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg"
            >
              <p className="text-sm text-amber-800">
                <strong>Development Notice:</strong> {emailJSError}
              </p>
            </motion.div>
          )}

          {/* Contact Info Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: PORTFOLIO_CONFIG.contact.email,
              },
              {
                icon: Phone,
                label: "Phone",
                value: PORTFOLIO_CONFIG.contact.phone,
              },
              {
                icon: MapPin,
                label: "Location",
                value: PORTFOLIO_CONFIG.contact.location,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-medium rounded-2xl p-6 text-center backdrop-blur-lg"
              >
                <item.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-sm text-foreground/60 mb-1">{item.label}</p>
                <p className="font-semibold text-foreground">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form with Glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="glass-heavy rounded-3xl p-8 md:p-12 backdrop-blur-xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <CheckCircle className="w-16 h-16 text-accent mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-foreground/70">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <p className="text-destructive text-sm">{submitError}</p>
                  </motion.div>
                )}

                {/* Name Input */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="glass-light rounded-lg border-white/20 bg-white/5 text-foreground placeholder:text-foreground/50 focus:border-accent focus:ring-accent disabled:opacity-50"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                  )}
                </motion.div>

                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="glass-light rounded-lg border-white/20 bg-white/5 text-foreground placeholder:text-foreground/50 focus:border-accent focus:ring-accent disabled:opacity-50"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </motion.div>

                {/* Message Textarea */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="glass-light rounded-lg border-white/20 bg-white/5 text-foreground placeholder:text-foreground/50 focus:border-accent focus:ring-accent resize-none disabled:opacity-50"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !emailJSReady}
                    className="w-full bg-accent hover:bg-accent/90 text-background font-semibold rounded-lg transition-all duration-300 py-6 text-lg glow-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : !emailJSReady ? (
                      "Initializing..."
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
