/**
 * Sanitize user data - removes sensitive information before sending to client
 * @param {Object} user - User document from database
 * @returns {Object} - Sanitized user object without password
 */
export const sanitizeUser = (user) => {
  if (!user) return null;
  
  // Convert to plain object if it's a Mongoose document
  const userObj = user.toObject ? user.toObject() : user;
  
  // Remove sensitive fields
  const { password, __v, ...sanitized } = userObj;
  
  return sanitized;
};

/**
 * Sanitize array of users
 * @param {Array} users - Array of user documents
 * @returns {Array} - Array of sanitized user objects
 */
export const sanitizeUsers = (users) => {
  if (!Array.isArray(users)) return [];
  return users.map(user => sanitizeUser(user));
};

