const router = require("express").Router();
let Post = require("../models/post");

router.route("/createPost").post((req, res) => {
  const username = req.body.username;

  const post = req.body.post;
  const color = req.body.color;
  const votes = req.body.votes;
  const title = req.body.title;
  if (post.left === "" || post.right === "") {
    return res.status(401).json({
      msg:
        "Hey , you might have left something blank, check again before submitting"
    });
  } else {
    newPost = new Post({
      username,
      post,
      color,
      votes,
      title
    });
    newPost
      .save()
      .then(() => res.json({ msg: "post created" }))
      .catch(err => {
        console.log(err);
        res.status(400).json({ msg: "Post cant be created " });
      });
  }
});

router.route("/getPosts").get((req, res, next) => {
  Post.find({}).then(function(p) {
    res.send(p);
  });
});
router.route("/updateVote").put((req, res) => {
  const id = req.body.id;
  const newVote = req.body.newVote;
  Post.findByIdAndUpdate(id, { votes: req.body.votes })
    .then(function(p) {
      res.send(p);
    })
    .catch(function(err) {
      res.status(400).json({ msg: "Invalid response, can't update vote" });
    });

  // Post.findById(id)
  //   .then(function(p) {
  //     res.send(p);
  //   })
  //   .catch(function(err) {
  //     res.status(400).json({ msg: "Cant update vote" });
  //   });
});
module.exports = router;
