const LoginUser = require('../models/LoginUser');
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

module.exports.UserLoginAction = (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    if (req.method !== 'POST') {
    } else {
        // Render the login page
        req.flash(
            "error_msg",
            `Invalid Request`
        );
        return res.redirect('/auth/login')
    }
}