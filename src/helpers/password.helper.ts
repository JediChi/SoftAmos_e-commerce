/**
 * Passwords will contain at least 1 upper case letter
 * Passwords will contain at least 1 lower case letter
 * Passwords will contain at least 1 number or special character
 * There is no length validation (min, max) in this regex!
 * @returns RegExp
 */

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;