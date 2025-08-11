const jwt = require('jsonwebtoken');

/**
 * Authentication Service using JWT (JSON Web Token)
 * This service provides methods to generate, verify, and decode JWTs.
 * It uses the 'jsonwebtoken' library for handling JWT operations.
 * It is designed to work with user authentication in a web application.
 * It includes methods to set user sessions, get user sessions, and destroy user sessions.
 * It is important to ensure that the secret key used for signing the JWT is kept secure and not exposed in the client-side code.
 * It is also important to handle errors properly, especially when dealing with user sessions and JWTs.
 * It is recommended to use HTTPS for secure transmission of JWTs and user data.
 * It is also recommended to implement proper error handling and logging mechanisms to track issues related to authentication and session management.
 * It is important to validate user input and sanitize data to prevent security vulnerabilities such as SQL injection and cross-site scripting (XSS) attacks.
 * It is also important to implement proper access control mechanisms to restrict access to sensitive resources based on user roles and permissions.
 * It is recommended to use environment variables to store sensitive information such as secret keys and database connection strings.
 */
const Tokens = [];
module.exports.Generate_JWT_Token = (req, user) => {
    if (!req || !user) {
        throw new Error('Request and user must be provided to generate JWT token');
        return;
    }

    /**
     * Generate JWT Token
     * @param {Object} user - The user object containing user information.
     * @returns {string} - The generated JWT token.
     */
    const token = jwt.sign(
        {
            id: user._id,
            user_name: user.user_name,
        },
        process.env.JWT_SECRET_KEY, // Use the secret key from environment variables
        { expiresIn: '1h' }
    )
    Tokens.push(token); // Store the token in the Tokens array for tracking
    return { token };
}

module.exports.Verify_JWT_Token = (token) => {
    if (!token) {
        return false;
    }
    try {
        const validate = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT token verification failed:', err);
                return false;
            }
            console.log('JWT token is valid:', decoded);
            return true;
        });
        return validate;
    } catch (error) { // Handle any errors that occur during token verification or handle before server crash
        console.error('Error verifying JWT token:', error);
        return false;
    }
}

module.exports.Destroy_token = (token) => {
    if (!token) {
        console.error('No token provided to destroy');
        return false;
    }
    Tokens.splice(Tokens.indexOf(token), 1); // Remove the token from the Tokens array
    console.log('Token destroyed successfully');
    return true;
}

/*
 Authentication Service using Session Management
 This service provides methods to set, get, and destroy user sessions.
 It uses express-session for session management.
*/
module.exports.SetUserSession = (req, user) => {
    if (!req || !user) {
        console.error('Request and user must be provided to set session');
        throw new Error('Request and user must be provided to set session');
        return;
    }

    // Store user information in session
    req.session.user = {
        id: user._id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_type: user.user_type,
    }

    return req.session.user;
}

module.exports.GetUserSession = (req) => {
    if (!req || !req.session || !req.session.user) {
        return false;
    }
    return req.session.user;
}

module.exports.DestroyUserSession = (req) => {
    if (!req || !req.session) {
        console.error('No session found to destroy');
        return false;
    }

    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.log("Error While Destroying Session", err);
            return false;
        }

        console.log("Session Is Destroyed Successfully");
        return true;
    })
}