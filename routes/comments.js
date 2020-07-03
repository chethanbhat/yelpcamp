const express = require('express');
const router = express.Router({mergeParams : true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// Comments - New

router.get('/new', middleware.isLoggedIn , (req, res) => {
    Campground.findById(req.params.id, (err, campground)=> {
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {campground : campground});
        }
    })
});

// Comments - Create

router.post('/', middleware.isLoggedIn , (req, res) => {
    // Campground by Id
     Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else {
              // Create Comment
              Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                    req.flash('error', 'Something went wrong');
                }else {
                    // Add username and id to comment

                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    // save comment

                    comment.save();

                    // connect new comment to campgrounds
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Comment Added Successfully !');
                     // redirect to campground show page. 
                    res.redirect(`/campgrounds/${campground._id}`);
                }
              });

        }
     });
});

// COMMENTS - EDIT

router.get('/:comment_id/edit', middleware.checkCommentAuthorization , (req, res) => {
    const campground_id  = req.params.id;
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect('back');
        }else {
            res.render('comments/edit', {campground_id : campground_id, comment: foundComment });
        }
    });
    
})

// COMMENTS - UPDATE

router.put('/:comment_id', middleware.checkCommentAuthorization,  (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
        if(err){
            res.redirect('back');
        }else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
})

// COMMENTS - DELETE

router.delete('/:comment_id', middleware.checkCommentAuthorization,  (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect('back');
        }else {
            req.flash('success', 'Comment Deleted');
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
})

module.exports = router;