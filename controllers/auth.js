const User = require("../models/user")

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postLogin = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            User.findById(user._id)
                .then(userModel => {
                    console.log(userModel)
                    req.session.user = userModel
                    res.redirect('/chat')
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
}