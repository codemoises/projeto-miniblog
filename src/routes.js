const express = require('express');
const routes = express.Router()

const UserController = require('./controllers/userController');
const PostController = require('./controllers/postController');

routes.get('/', (req, res) => {res.send('Ok')});
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.get);
routes.post('/users/delete/:id', UserController.delete);
routes.post('/users/create',UserController.create);
routes.post('/users/update/:id', UserController.update);
routes.post('/users/follow/:id', UserController.follow);
routes.post('/users/unfollow/:id', UserController.unfollow);

routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.get);
routes.get('/posts/list/:id', PostController.getByOwner);
routes.post('/posts/delete/:id', PostController.delete);
routes.post('/posts/create',PostController.create);
routes.post('/posts/update/:id', PostController.update);
routes.post('/posts/like/:id', PostController.like);
routes.post('/posts/unlike/:id', PostController.unlike);
routes.post('/posts/comment/:id', PostController.comment);
routes.post('/posts/uncomment/:id', PostController.uncomment);
routes.post('/posts/report/:id', PostController.report);
routes.post('/posts/share/:id', PostController.share);
module.exports = routes;