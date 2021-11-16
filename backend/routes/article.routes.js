import express from 'express';
import ArticlesDAO from '../DAO/articlesDAO.js';

const articleRouter = express.Router();

// create route
articleRouter.post('/new', ArticlesDAO.createArticle);

// update route
articleRouter.put('/:userName/updateArt', ArticlesDAO.updateArticle);

// read route
articleRouter.get('/:articleId/read', ArticlesDAO.readArticle);

// get all route
articleRouter.get('/getAll', ArticlesDAO.getAll);

// upvote route
//articleRouter.put('/:articleId/upvote', ArticlesDAO.upvoteArticle);

// filtered route
articleRouter.get('/filtered', ArticlesDAO.getByFilter);

// delete route
articleRouter.delete('/:userId/:articleId/delete', ArticlesDAO.deleteArticle);

export default articleRouter;