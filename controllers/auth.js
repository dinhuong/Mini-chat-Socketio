const User = require("../models/user")

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username
    User.findOne({ username: username })
        .then(async user => {
            if (!user) {
                const user = await new User({
                    username: username,
                    password: 'test',
                    chats: []
                })
                await user.save()
            }
            req.session.user = user
            res.redirect('/chat')
        })
        .catch(e => console.log(e))
}