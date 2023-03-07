const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt")

//reqester API

router.post('/register',async (req,res)=>{
    try{
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:hashPass,
            });
            const user = await newUser.save();
            console.log(user)
            res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
});

//login API

router.post('/login',async (req,res) => {
    try{
            const user = await User.findOne({ email:req.body.email})
            !user && res.status(400).json("Wrong Credentials");

            const validated = await bcrypt.compare(req.body.password, user.password)
            !validated && res.status(422).json("Incorrect Password")

            const {password, ...others} = user._doc; // because we not sending password
            res.status(200).json(others);
    } catch(err){
        res.status(500).json(err)
    }
});


module.exports = router;