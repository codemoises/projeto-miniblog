const Users = require('../models/user');

module.exports = { 
    async index(req, res) {
        const user = await Users.find();
        
        return res.json(user);
    },
    async get(req, res){
        const user = await Users.findOne({id: req.params.id});
        
        return res.json(user);
    },
    async create(req, res) {
        try{

            const user = await Users.create(req.body);
            
            return res.send(user);
        }
        catch(err){
            return res.status(400).send(err.message);
        }
    },
    async delete(req, res){
        const response = await Users.deleteOne({id: req.params.id});

        return res.json(response);
    },
    async update(req, res){
        let user = await Users.findOne({id: req.params.id});
        for(var key in req.body) 
            user[key] = req.body[key];
        const response = await Users.updateOne({id: req.params.id}, {$set: user});

        return res.send(response);
    },
    async follow(req, res){
        let follower = await Users.findOne({id: req.body["followerId"]});
        
        const response = await Users.updateOne({id: req.params.id}, {$addToSet: {followers: follower._id.toString()}});

        return res.send(response);
    },
    async unfollow(req, res){
        let follower = await Users.findOne({id: req.body["followerId"]});
        
        const response = await Users.updateOne({id: req.params.id}, {$pull: {followers: follower._id.toString()}});

        return res.send(response);
    },
    async report(req, res){
        const response = await Users.updateOne({id: req.params.id}, {$addToSet: {reports: req.body.reason}});

        return res.send(response);
    }
};
