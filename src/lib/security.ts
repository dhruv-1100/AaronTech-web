/**
 * Security utilities for input validation and sanitization.
 */

/** Maximum allowed length for message/body fields */
export const MAX_MESSAGE_LENGTH = 5000;

/** Maximum allowed length for name fields */
export const MAX_NAME_LENGTH = 200;

/** Maximum allowed length for subject fields */
export const MAX_SUBJECT_LENGTH = 300;

/**
 * Escapes HTML special characters to prevent XSS in email templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Validates an email address against a standard regex pattern.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
