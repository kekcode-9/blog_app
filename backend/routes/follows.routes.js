import express from 'express';
import FollowsDAO from '../DAO/followsDAO.js';

const followsRouter = express.Router();

// new follower route
followsRouter.post('/:followerId/follows/:followedId', FollowsDAO.addFollower);

// remove follower route
followsRouter.delete('/:followerId/unfollow/:followedId', FollowsDAO.removeFollower);
export default followsRouter;