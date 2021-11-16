import Article from "../schema/article.js";
import Comment from "../schema/comment.js";
import mongoose from 'mongoose';

// delete your article

export default class ArticlesDAO {
    // create new article
    static async createArticle(req, res, next) {
        try{
            const newArticle = new Article({
                author: req.body.id,
                authorName: req.body.userName,
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags
            });
            const article = await newArticle.save();
            res.status(200).json(article);
        } catch(err) {
            res.status(500).json(err);
        }
    }

    // update existing article
    static async updateArticle(req, res, next) {
        try{
            if(req.params.userName === req.body.userName) {
                const updatedArticle = await Article.findByIdAndUpdate(
                    req.body.articleId,
                    {
                        $set: req.body
                    },
                    {
                        new: true
                    }
                );
                res.status(200).json(updatedArticle);
            }
        } catch(err) {
            res.status(500).json(err);
        }
    }

    // read an article
    static async readArticle(req, res, next) {
        try{
            const test = await Article.aggregate([
                {
                    "$lookup": {
                        from: "comments",
                        localField: "_id",
                        foreignField: "article",
                        as: "commentsArray"
                    }
                }
            ]);
            console.log('test: ' + test);
            const article = await Article.aggregate([
                {
                    "$match": {
                        "_id": mongoose.Types.ObjectId(req.params.articleId)
                    }
                },
                {
                    "$lookup": {
                        from: "comments",
                        localField: "_id",
                        foreignField: "article",
                        as: "commentsArray"
                    }
                }
            ]);
            res.status(200).json(article);
        } catch(err) {
            res.status(404).json('error fetching article: ' + err);
        }
    }

    // delete an Article
    static async deleteArticle (req, res, next) {
        if (req.params.userId === req.body.userId) {
            try {
                Comment.deleteMany({ article: req.params.articleId });
                Article.findByIdAndDelete(req.params.articleId);
                res.status(200).json('Article has been deleted')
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You are not authorised to delete the article');
        }
    }
}