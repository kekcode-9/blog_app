import express from 'express';
import CommentsDAO from '../DAO/commentsDAO.js';

const commentRouter = express.Router();

// create route
commentRouter.post('/:userId/:articleId/write', CommentsDAO.writeComment);

// update route
commentRouter.put('/:userId/:commentId/edit', CommentsDAO.editComment);

// upvote route

// delete route
commentRouter.delete('/:userId/:commentId/delete', CommentsDAO.deleteComment);

export default commentRouter;