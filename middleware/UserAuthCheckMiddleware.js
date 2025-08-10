// Check is user is logged in
const UserAuthCheck = (req, res, next) => {
    if (req.session.user) {
        // User is logged in, proceed to the next middleware or route handler
        return next();
    }
    // User is not logged in, redirect to login page
    return res.redirect('/auth/login');
}


module.exports = {
    UserAuthCheck: UserAuthCheck
};