const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

router.put("/:id", async(req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(13)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            const { password, ...others } = user._doc
            res.status(200).json(others)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can update only your account!")
    }
})

router.delete("/:id", async(req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            const user = await User.deleteOne({ _id: req.params.id })
            res.status(200).json("account has been deleted")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you can delete only your account!")
    }
})

router.get("/", async(req, res) => {
    const userId = req.query.userid
    const username = req.query.username
    try {
        const user = userId ? await User.findById(userId) : await User.findOne({ username: username })
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/sugs/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
            //const sugs = await User.find({ _id: { $nin: user.followings }, _id: { $ne: req.params.id } }).limit(10)
        const sugs = await User.aggregate([
            { $sample: { size: 10 } },
        ])
        res.status(200).json(sugs)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/friends/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        try {
            const friends = user.followings.filter(u => user.followers.includes(u))
            res.status(200).json(friends)
        } catch (err) {
            res.status(500).json(err)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id/follow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const correntUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await correntUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json("user has been followed")
            } else {
                res.status(403).json("you already follow this user")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you cant follow your self")
    }
})

router.get("/:userId1/isfollow/:userId2", async(req, res) => {
    try {
        const isFollow = await User.findOne({ _id: req.params.userId1, followings: { $in: [req.params.userId2] } })
        res.status(200).json(isFollow ? true : false)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id/unfollow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const correntUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await correntUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("user has been unfollowed")
            } else {
                res.status(403).json("you already unfollow this user")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you cant unfollow your self")
    }
})

module.exports = router