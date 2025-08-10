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