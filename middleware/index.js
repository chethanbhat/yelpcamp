// All the middleware goes here

const middlewareObj = {};
const Campground = require('../models/campground');
const Comment = require('../models/comment');

middlewareObj.checkCampgroundAuthorization = function(req, res, next){

    if(req.isAuthenticated()){
        // if logged in, does user own campground?

        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                req.flash('error', 'Campground not found !');
                res.redirect('back');
            } else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    req.flash('error', 'You don\'t have permission to do that !');
                    res.redirect('back');
                }
            }
        });
 
    } else {
        req.flash('error', 'You need to login first!');
        res.redirect('back');
    }

}

middlewareObj.checkCommentAuthorization = function(req, res, next){

    if(req.isAuthenticated()){
        // if logged in, does user own comment?

        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect('back');
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    req.flash('error', 'You don\'t have permission to do that !');
                    res.redirect('back');
                }
            }
        });
 
    } else {
        req.flash('error', 'You need to login first!');
        res.redirect('back');
    }

}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first!');
    res.redirect('/login');
}

module.exports = middlewareObj;