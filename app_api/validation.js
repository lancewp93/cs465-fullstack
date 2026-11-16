const authConfig = require('./config/authConfig');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * List of commonly used weak passwords that should be rejected
 */
const commonWeakPasswords = [
  'password', 'password123', '123456', '12345678', 'qwerty', 'abc123',
  'monkey', 'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou',
  '1q2w3e4r', 'welcome', 'passw0rd', 'shadow', 'sunshine', 'princess',
  'solo', 'starwars', 'qwertyuiop', '1234567890'
];

function isValidEmail(email) {
  return typeof email === 'string' && emailRegex.test(email.trim());
}

/**
 * Validates password complexity requirements.
 * A strong password must:
 * - Be at least PASSWORD_MIN_LENGTH characters long
 * - Contain at least one uppercase letter
 * - Contain at least one lowercase letter
 * - Contain at least one number
 * - Contain at least one special character (!@#$%^&*)
 * - Not be a commonly used weak password
 */
function validatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return 'Password is required.';
  }

  if (password.length < authConfig.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${authConfig.PASSWORD_MIN_LENGTH} characters long.`;
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }

  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }

  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*).';
  }

  if (commonWeakPasswords.includes(password.toLowerCase())) {
    return 'Password is too common. Please choose a more unique password.';
  }

  return null;
}

function validateRegistrationPayload(body) {
  if (!body || typeof body !== 'object') {
    return 'Request body is required.';
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!name) {
    return 'Name is required.';
  }

  if (name.length > 100) {
    return 'Name must not exceed 100 characters.';
  }

  if (!isValidEmail(email)) {
    return 'A valid email is required.';
  }

  const passwordError = validatePasswordStrength(password);
  if (passwordError) {
    return passwordError;
  }

  return null;
}

function validateLoginPayload(body) {
  if (!body || typeof body !== 'object') {
    return 'Request body is required.';
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!isValidEmail(email)) {
    return 'A valid email is required.';
  }

  if (!password) {
    return 'Password is required.';
  }

  return null;
}

function validateTripCode(tripCode) {
  if (!tripCode || typeof tripCode !== 'string' || !tripCode.trim()) {
    return 'Trip code is required.';
  }

  return null;
}

function validateTripPayload(body) {
  if (!body || typeof body !== 'object') {
    return 'Trip data is required.';
  }

  const requiredFields = ['code', 'name', 'length', 'start', 'resort', 'perPerson', 'image', 'description'];

  for (const field of requiredFields) {
    const value = body[field];
    if (value === undefined || value === null || (typeof value === 'string' && !value.trim())) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }
  }

  return null;
}

module.exports = {
  isValidEmail,
  validatePasswordStrength,
  validateRegistrationPayload,
  validateLoginPayload,
  validateTripCode,
  validateTripPayload,
};
