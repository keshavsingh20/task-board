const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../Model/User')
const Jwt = require('jsonwebtoken')

const router = express.Router();
const jwtKey = process.env.JWT_KEY;

// api for user registration(signup)
router.post('/register', async (req, resp)=>{
    const findUser = await User.findOne({ email: req.body.email })

    if(!findUser) {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = await User.create({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email
            })

            let userData = await user.save();
            userData = userData.toObject();
            delete userData.password;

            if(userData) {
                Jwt.sign(userData, jwtKey,{expiresIn:"2h"}, (err, token)=>{
                    if(err) {
                        resp.send({res:"Something Went Wrong. Please try again after sometime."})
                    }
                    resp.status(200).send({userData, auth:token})
                })
            } 
        }
        catch(error) {
            resp.status(500).send({error: 'Internal Server Error..!'})
        }
    }
    else {
        resp.send({res: "Email address already registered. Please use different email address."})
    }
})

// api for user login
router.post('/login',async (req, resp)=> {
    if(req.body.email && req.body.password) {
        try {
            let user = await User.findOne({email: req.body.email});
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if(user) {
                if(isPasswordValid) {
                    user = user.toObject()
                    delete user.password;
                    
                    Jwt.sign({user}, jwtKey, {expiresIn:'2h'}, (err, token)=> {
                        if(err) {
                            resp.send({res:"Something Went Wrong. Please try again after sometime."})
                        }
                        resp.status(200).send({user, auth:token});
                    })
                }
                else {
                    resp.send({res : "Invalid Password..! Please Enter Correct Password..!"})
                }
            }
            else {
                resp.send({res : "User not found...! Please register yourself..!"})
            }
        }
        catch(err) {
            // console.log(err)
            resp.send({res : "Internal Server Error...! Please try again after sometime..!"})
        }
    }
    else {
        resp.send({res : "User not found...! Please register yourself..!"})
    }
})

module.exports = router;