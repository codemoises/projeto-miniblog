const Users = require('../models/user')
const Posts = require('../models/post');

module.exports = {
    async index(req, res) {
        const posts = await Posts.find({isReply: false});
        
        return res.json(posts);
    },
    async get(req, res){
        const post = await Posts.findOne({_id: req.params.id});
        
        return res.json(post);
    },
    async getByOwner(req, res){
        const post = await Posts.find({ownerId: req.params.id});

        return res.json(post);
    },
    async create(req, res) {
        const post = await Posts.create(req.body);

        return res.send(post);
    },
    async delete(req, res){
        const post = await Posts.findOne({_id: req.params.id});
        await Posts.deleteMany({_id: { $in: post.comments}});
        const response = await Posts.deleteOne({_id: req.params.id});
        return res.json(response);
    },
    async update(req, res){
        let post = await Posts.findOne({_id: req.params.id});
        for(var key in req.body) 
            post[key] = req.body[key];
        const response = await Posts.updateOne({_id: req.params.id}, {$set: post});

        return res.send(response);
    },
    async like(req, res){
        let user = await Users.findOne({id: req.body["userId"]});
        
        const response = await Posts.updateOne({_id: req.params.id}, {$addToSet: {likes: user._id.toString()}});

        return res.send(response);
    },
    async unlike(req, res){
        let user = await Users.findOne({id: req.body["userId"]});
        
        const response = await Posts.updateOne({_id: req.params.id}, {$pull: {likes: user._id.toString()}});

        return res.send(response);
    },
    async comment(req, res){
        let comment = await Posts.findOne({_id: req.body["postId"]});

        const response = await Posts.updateOne({_id: req.params.id}, {$addToSet: {comments: comment._id.toString()}});

        return res.send(response);
    },
    async uncomment(req, res){
        let comment = await Posts.findOne({_id: req.body["postId"]});

        const response = await Posts.updateOne({_id: req.params.id}, {$pull: {comments: comment._id.toString()}});

        return res.send(response);
    },
    async report(req, res){
        const response = await Posts.updateOne({_id: req.params.id}, {$addToSet: {reports: req.body.userId}});

        return res.send(response);
    },
    async share(req, res){
        const originalPost = await Posts.findOne({_id: req.params.id});

        let post = originalPost; 
        const response = await Posts.create(post);
        await Posts.updateOne({_id: req.params.id}, {$addToSet: {shares: post._id.toString()}});
        
        return res.send(response);
    }
}