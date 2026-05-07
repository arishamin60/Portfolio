/**
 * EmailJS Configuration
 * Handles environment variable validation and provides safe configuration
 */

interface EmailJSConfig {
  publicKey: string;
  serviceId: string;
  templateId: string;
  isConfigured: boolean;
  error?: string;
}

/**
 * Validates and returns EmailJS configuration from environment variables
 * Returns isConfigured: false if any required variable is missing
 */
export function getEmailJSConfig(): EmailJSConfig {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  // Check if all required variables are present
  if (!publicKey || !serviceId || !templateId) {
    const missingVars = [];
    if (!publicKey) missingVars.push("VITE_EMAILJS_PUBLIC_KEY");
    if (!serviceId) missingVars.push("VITE_EMAILJS_SERVICE_ID");
    if (!templateId) missingVars.push("VITE_EMAILJS_TEMPLATE_ID");

    return {
      publicKey: "",
      serviceId: "",
      templateId: "",
      isConfigured: false,
      error: `Missing EmailJS configuration: ${missingVars.join(", ")}. Please check your .env.local file.`,
    };
  }

  return {
    publicKey,
    serviceId,
    templateId,
    isConfigured: true,
  };
}

/**
 * Checks if EmailJS is properly configured
 */
export function isEmailJSConfigured(): boolean {
  const config = getEmailJSConfig();
  return config.isConfigured;
}

/**
 * Gets a user-friendly error message if EmailJS is not configured
 */
export function getEmailJSConfigError(): string | null {
  const config = getEmailJSConfig();
  return config.error || null;
}
