exports.signup = function (req, res) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;
        var email = post.email;
        var pass = post.password;

        var sql = "INSERT INTO `users`(`email`, `password`) VALUES ('" + email + "','" + pass + "')";

        var query = db.query(sql, function (err, result) {

            message = "Succesfully! Your account has been created.";
            res.render('signup.ejs', { message: message });
        });

    } else {
        res.render('signup');
    }
};

exports.login = function (req, res) {
    var message = '';
    var sess = req.session;

    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var pass = post.password;

        var sql = "SELECT id, email FROM `users` WHERE `email`='" + name + "' and password = '" + pass + "'";
        db.query(sql, function (err, results) {
            if (results.length) {
                req.session.userId = results[0].id;
                req.session.user = results[0];
                console.log(results[0].id);
                res.redirect('/home/dashboard');
            }
            else {
                message = 'Wrong Credentials.';
                res.render('index.ejs', { message: message });
            }

        });
    } else {
        res.render('index.ejs', { message: message });
    }
};



exports.dashboard = function (req, res, next) {

    var user = req.session.user,
        userId = req.session.userId;

    if (userId == null) {
        res.redirect("/home/login");
        return;
    }

    var sql = "SELECT * FROM `login_details` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {

        console.log(results);

        res.render('profile.ejs', { user: user });

    });
};

exports.dashboard = function (req, res, next) {

    var user = req.session.user,
        userId = req.session.userId;

    if (userId == null) {
        res.redirect("/home/login");
        return;
    }

    var sql = "SELECT * FROM `login_details` WHERE `id`='" + userId + "'";

    db.query(sql, function (err, results) {

        console.log(results);

        res.render('profile.ejs', { user: user });

    });
};