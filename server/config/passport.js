const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const {compare} = require('bcryptjs');

//load User Model

const User = require("../models/User");

module.exports = function(passport) {
passport.use(
    new LocalStrategy({usernameField: 'email'} , (email, password, done) => {
        //Match User
      
         User.findOne({email: email})
         .then(user => {
            if(!User) {
                return done(null , false , {message: 'email is not registered'});
            }

                     //match password
            compare(password , user.password), (err, isMatch) => {
    if(err) throw err;
                if(isMatch){
                    return done(null,user);
                } else {
                    return done(null, false, {message:"password incorrect"});
                }
            }

         })
       
     .catch(err => console.log(err))
    })
);

//serialize
passport.serializeUser((user, done)=> {
    done(null , user.id);
});

//deserialize
passport.deserializeUser((id, done)=> {
    User.findById(id,(err,user)=> {
            done(err, user);
    });
});
}