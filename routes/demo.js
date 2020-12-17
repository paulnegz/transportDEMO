const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Vote = require('../public/models/Vote')

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1123908",
  key: "5ec2daa1e7575e3a5eef",
  secret: "d7f3aceadca534110437",
  cluster: "us2",
  useTLS: true
});


router.get('/', (req, res)=>{
    Vote.find().then(votes=> res.json({success: true, votes: votes}));
});

router.post('/', (req, res)=>{
    //add votes and save to DB
    const newVote = {
        points: 1,
        primaryMode: req.body.primaryMode
    }
    new Vote(newVote).save().then(vote=>{          
        pusher.trigger("primaryMode-poll", "primaryMode-vote", {
            points: parseInt(vote.points),
            primaryMode: vote.primaryMode
        });
        return res.json({sucess: true, message: 'Thank you for your response'})
        
    });

;

});

module.exports = router;