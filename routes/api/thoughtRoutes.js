const router = require("express").Router();
const { User, Thought } = require("../../models");
const reactionSchema = require("../../models/Reaction");

//get all thoughts
router.get("/", async (req, res) => {
    await Thought.find({})
    .then(thoughts => {
      res.json(thoughts);
    })
    .catch(err => {
      res.status(404).json(err);
    });
})

//get a single thought by id
router.get("/:thoughtId", async (req, res) => {
    await Thought.findById(req.params.thoughtId)
    .then(thought => {
        res.json(thought);
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

// //post a new thought
// post to create a new thought (dont forget to push the created thoughts id to the associated users thoughts array field)
router.post("/", async (req, res) => {
    try{
        const thoughtData = await Thought.create(req.body);

        await User.findOneAndUpdate({userName: req.body.userName}, {$push: {thoughts: thoughtData._id}})

        res.json(thoughtData);

    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})

// //put to update a thought by id
router.put("/:thoughtId", async (req, res) => {
    try {
        const data = await Thought.findByIdAndUpdate({_id: req.params.thoughtId}, req.body , {new: true});
        res.json(data);

    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})
 
// //delete to remove thought by id
router.delete("/:thoughtId", async (req, res) => {
    await Thought.deleteOne({_id: req.params.thoughtId})
    .then(thought => {
      res.json(thought);
    })
    .catch(err => {
      res.status(404).json(err);
})
})
    

//post to create reaction stored in a single thought's reaction array field
router.put("/:thoughtId/reaction", async (req, res) => {
    try{
        const data = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push:{reactions: req.body}}, {new: true} )
        res.json(data)
    }catch(err) {
        console.log(err)
        res.status(400).json(err);
    }
});



// delete to pull and remove a reaction by the reactions reaction id value
router.put("/:thoughtId/reaction/:reactionId", async (req, res) => {
    try {
        const data = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull:{reactions: {_id: req.params.reactionId}}}, {new: true})
        res.json(data)
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})


module.exports = router
