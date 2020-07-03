const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.get('/', (req, res) => res.render('landing'));

// Sign Up Route - Form

router.get('/register', (req, res) => {
    res.render('register');
});

// Sign Up Route - Create User

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err){
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', `Welcome ! + ${req.body.username}`);
            res.redirect('/campgrounds');
           
        });
    });
});

// Login Route

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', 
{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'

}) , (req, res) => {

});  

// Logout Route

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged you out');
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;