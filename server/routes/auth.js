const express = require('express')
const passport = require('passport')
const router = express.Router()
const url = require('url')

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const user = req.user; 
    res.redirect(url.format({
      pathname:"http://localhost:3001/trips",
      query:{
        displayName: user.displayName,
        image: user.image,
        googleId: user.googleId
      },
    })
    );
  }
)

module.exports = router