/**
 * An array of public routes that are accesible for the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are user for authentication
 * These routes will redirect logged in users to /modules
 * @type {string[]}
 */
export const authRoutes = ["/", "/auth/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication propuses
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect route after a user logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/modules";
