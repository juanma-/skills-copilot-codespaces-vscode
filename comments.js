// Create web server for comments
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');

// Get all comments
router.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.json({message: 'Error getting comments'});
    } else {
      res.json(comments);
    }
  });
});

// Get comment by id
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      res.json({message: 'Error getting comment'});
    } else {
      res.json(comment);
    }
  });
});

// Create comment
router.post('/', function(req, res) {
  var comment = new Comment();
  comment.text = req.body.text;
  comment.user = req.body.user;
  comment.save(function(err) {
    if (err) {
      res.json({message: 'Error creating comment'});
    } else {
      res.json({message: 'Comment created'});
    }
  });
});

// Update comment
router.put('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      res.json({message: 'Error updating comment'});
    } else {
      comment.text = req.body.text;
      comment.save(function(err) {
        if (err) {
          res.json({message: 'Error updating comment'});
        } else {
          res.json({message: 'Comment updated'});
        }
      });
    }
  });
});

// Delete comment
router.delete('/:id', function(req, res) {
  Comment.remove({_id: req.params.id}, function(err) {
    if (err) {
      res.json({message: 'Error deleting comment'});
    } else {
      res.json({message: 'Comment deleted'});
    }
  });
});

module.exports = router;
