const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/reqLogin')







router.post('/signup', (req,res) => {
    const {name,email,password,photo} = req.body

    if(!email || !password || !name){
        return res.status(422).json({error: "All fields are required"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser) {
            return res.status(422).json({error: "User already exists under that email."})
        }
        bcrypt.hash(password, 12)
            .then(hashedpassword => {
                const user = new User({
                    email,
                    password:hashedpassword,
                    name,
                    photo
                })
                user.save()
                .then(user => {
                    res.json({message:"User was created successfully."})
                })
                .catch(err=>{
                    console.log(err)
                })


            })

    })
    .catch(err => {
        console.log(err)
    }) 
})



router.post('/signin', (req,res) => {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(422).json({error: "Please enter email or password"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(!savedUser) {
            return res.status(422).json({error: "Invaild Email or Password"})
        }
        bcrypt.compare(password, savedUser.password)
            .then(doMatch => {
                if(doMatch) {
                    const token = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET)
                    const {_id,
                        name,
                        email,
                        followers,
                        following,
                        photo} = savedUser

                    res.json({token,user:{_id,
                        name,
                        email,
                        followers,
                        following,
                        photo}})

                } else {
                    return res.status(422).json({error: "Invaild Email or Password"})
                }



            }).catch (err => {
                console.log(err)
            })  
    })      
})

module.exports = router