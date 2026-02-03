/**
 * Input Validation Utilities
 * Client-side validation for forms
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  
  // Optional: Add more strength requirements
  // const hasUpperCase = /[A-Z]/.test(password);
  // const hasLowerCase = /[a-z]/.test(password);
  // const hasNumber = /\d/.test(password);
  
  return { isValid: true, message: '' };
};

/**
 * Validate roll number (numeric, positive)
 * @param {string|number} rollNum - Roll number to validate
 * @returns {boolean} - True if valid roll number
 */
export const validateRollNumber = (rollNum) => {
  if (!rollNum) return false;
  const num = Number(rollNum);
  return !isNaN(num) && num > 0 && Number.isInteger(num);
};

/**
 * Validate name (letters and spaces only, min 2 chars)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid name
 */
export const validateName = (name) => {
  if (!name) return false;
  const trimmedName = name.trim();
  if (trimmedName.length < 2) return false;
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(trimmedName);
};

/**
 * Sanitize string input (remove HTML tags and trim)
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/<[^>]*>/g, '').trim();
};

/**
 * Validate required field
 * @param {any} value - Value to check
 * @returns {boolean} - True if not empty
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone number
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate marks (0-100)
 * @param {number} marks - Marks to validate
 * @returns {boolean} - True if valid marks
 */
export const validateMarks = (marks) => {
  const num = Number(marks);
  return !isNaN(num) && num >= 0 && num <= 100;
};
