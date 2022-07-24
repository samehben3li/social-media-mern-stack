const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")


router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(13)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json("user not found")
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            res.status(400).json("wrong password")
        }
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router