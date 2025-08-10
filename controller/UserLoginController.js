const LoginUser = require('../models/LoginUser');
const { uuid } = require('uuidv4');

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
