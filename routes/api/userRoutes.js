const router = require("express").Router();
const { User, Thought } = require("../../models");
const reactionSchema = require("../../models/Reaction");


//get all users
router.get("/",  async (req, res) => {
    await User.find({})
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(404).json(err);
    });
})

//get a single user by id with populated thought and friend data

router.get("/:userId", async (req, res) => {
    await User.findById(req.params.userId)
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(404).json(err)
    })
});


// //post a new user

router.post("/", async ({body}, res) => {
    try{
        const data = await User.create(body);
        res.json(data);

    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }

})


// //put to update a user by id

router.put("/:userId", async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate({_id: req.params.userId}, req.body , {new: true});
        res.json(data);

    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})

// //delete to remove user by id

router.delete("/:userId", async (req, res) => {
    await User.deleteOne({_id: req.params.userId})
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(404).json(err);
})
})

// //post to add a new friend to a users friend list

router.put("/:userId/friends/:friendId", async (req, res) => {
    try {
        const data = await User.findOneAndUpdate({_id: req.params.userId}, {$push: {friends: req.params.friendId}}, {new: true})
        res.json(data)
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
})


// // delete to remove a freiend from a users friend list

// router.delete("/:userId/friend/friendId", ({body}, res) => {

// })

module.exports = router