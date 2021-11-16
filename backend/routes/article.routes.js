import express from 'express';
import ArticlesDAO from '../DAO/articlesDAO.js';

const articleRouter = express.Router();

// create route
articleRouter.post('/new', ArticlesDAO.createArticle);

// update route
articleRouter.put('/:userName/updateArt', ArticlesDAO.updateArticle);

// read route
articleRouter.get('/:articleId/read', ArticlesDAO.readArticle);

// upvote route
//articleRouter.put('/:articleId/upvote', ArticlesDAO.upvoteArticle);

// delete route

export default articleRouter;