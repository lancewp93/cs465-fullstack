const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === 'string' && emailRegex.test(email.trim());
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

  if (!isValidEmail(email)) {
    return 'A valid email is required.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
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

  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long.';
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
  validateRegistrationPayload,
  validateLoginPayload,
  validateTripCode,
  validateTripPayload,
};
