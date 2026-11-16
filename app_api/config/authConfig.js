
module.exports = {
  // PBKDF2 password hashing configuration
  PBKDF2_ITERATIONS: 100000,  // Number of iterations for PBKDF2 (increased from 1000 for better security)
  PBKDF2_HASH_LENGTH: 64,     // Length of the generated hash in bytes
  PBKDF2_DIGEST: 'sha512',    // Digest algorithm for PBKDF2

  // Password validation configuration
  PASSWORD_MIN_LENGTH: 12,    // Minimum password length (increased from 6)
  
  // JWT configuration
  JWT_EXPIRY: process.env.JWT_EXPIRY || '1h',  // Token expiration time
};
