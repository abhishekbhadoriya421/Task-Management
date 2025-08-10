const e = require('connect-flash');
const LoginUser = require('../models/LoginUser');
const { uuid } = require('uuidv4');
const { DestroyUserSession, SetUserSession, GetUserSession } = require('../servies/AuthServices');

module.exports.LoginFormAction = (req, res) => {
    // Check if user is already logged in
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    const model = new LoginUser();
    // Render the login page
    res.render('login/form', {
        title: 'Login',
        model: model,
    });
}

module.exports.UserLoginAction = async (req, res) => {
    const { user_email, user_password } = req.body;

    if (!user_email || !user_password) {
        req.flash('error_msg', 'Email and password are required');
        return res.redirect('/auth/login');
    }
    // Find user by email
    const user = await LoginUser.findOne({ 'user_email': user_email });
    if (!user) {
        req.flash('error_msg', 'Account not found with this email');
        return res.redirect('/auth/login');
    }

    if (user.user_password !== user_password) {
        req.flash('error_msg', 'Incorrect password');
        return res.redirect('/auth/login');
    }

    // Store user information in session
    SetUserSession(req, user);
    req.flash('success_msg', 'Login successful');
    // Redirect to dashboard or home page
    return res.redirect('/dashboard');
}

module.exports.SignUpFormAction = (req, res) => {
    // Check if user is already logged in
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    const model = new LoginUser();
    // Render the sign-up page
    res.render('login/sign-up-form', {
        title: 'Sign Up',
        model: model,
    });
}

module.exports.CreateUserAction = async (req, res) => {
    const { user_name, user_email, user_password, confirm_password, mobile_number, user_type } = req.body;

    if (!user_email || !user_name || !user_password || !confirm_password || !mobile_number || !user_type) {
        req.flash('error_msg', 'All fields are required');
        return res.redirect('/auth/sign-up');
    }
    // Check if passwords match

    if (user_password !== confirm_password) {
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/auth/sign-up');
    }

    // check if user already exists
    const existingUser = await LoginUser.findOne({ user_email: user_email });

    if (existingUser) {
        req.flash('error_msg', 'User already exists with this email');
        return res.redirect('/auth/sign-up');
    }

    // Create a new user
    const newUser = new LoginUser({
        user_name: user_name,
        user_email: user_email,
        user_password: user_password, // Note: Password should be hashed in production
        mobile_number: mobile_number,
        user_type: user_type,
        created_at: new Date().toISOString(),
    });

    try {
        await newUser.save();
        console.log('User created successfully')
        req.flash('success_msg', 'User created successfully');
        return res.redirect('/auth/login');
    } catch (error) {
        console.error('Error creating user:', error);
        req.flash('error_msg', 'An error occurred while creating the user');
        return res.redirect('/auth/sign-up');
    }

}


// Logout action

module.exports.LogOutAction = (req, res) => {
    // Destroy the user session
    const sessionDestroyed = DestroyUserSession(req);
    if (sessionDestroyed) {
        // req.flash('success_msg', 'You have been logged out successfully');
        console.log("User logged out successfully");
    } else {
        console.error("Error while logging out");
        // req.flash('error_msg', 'Error while logging out');
    }
    return res.redirect('/');
}