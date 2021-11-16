import { json } from "express";
import Comment from "../schema/comment.js";

export default class CommentsDAO {
    
    // write new comment
    static async writeComment(req, res, next) {
        try{
            const newComment = new Comment({
                commenter: req.params.userId,
                article: req.params.articleId,
                originalPoster: req.body.opId,
                text: req.body.text
            });
            const comment = await newComment.save();
            res.status(200).json(comment);
        } catch(err) {
            res.status(500).json(err);
        }
    }

    // edit existing comment
    static async editComment(req, res, next) {
        if(req.params.userId === req.body.userId) {
            try {
                const editedComment = await Comment.findByIdAndUpdate(
                    req.params.commentId,
                    {
                        '$set': req.body
                    },
                    {
                        new: true
                    }
                );
                console.log('editedComment: ' + editedComment);
                res.status(200).json(editedComment);
            } catch(err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You do not have permission to edit this comment');
        }
    }

    // delete comment
    static async deleteComment (req, res, next) {
        if(req.params.userId === req.body.id) {
            try {
                await Comment.findByIdAndDelete(req.params.commentId);
                res.status(200).json('comment deleted');
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json('You do not have permission to delete this comment');
        }
    }
}