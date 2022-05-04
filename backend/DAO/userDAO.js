import User from '../schema/user.js';
import Article from '../schema/article.js';
import Follows from '../schema/follows.js';
import Comment from '../schema/comment.js';
import bcrypt from 'bcrypt';

export default class UserDAO {
    // signup new user
    static async signupUser (req, res, next) {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
            const newUser = new User({
                name: req.body.name,
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword
            });
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(`signup error: ${err}`);
        }
    }

    // logging in existing user
    static async loginUser(req, res, next) {
        try{
            const user = await User.findOne({userName: req.body.userName});
            !user && res.status(400).json('Please enter correct username');

            const valid = await bcrypt.compare(req.body.password, user.password);
            !valid && res.status(400).json('Invalid Password');
            
            // create session user
            const sessUser = {
                id: user._id,
                userName: user.userName,
                email: user.email
            };
            console.log('req.session: ' + req.session);

            req.session.user = sessUser; // will autosave the session on mongostore
            
            res.status(200).json(sessUser);

        } catch(err) {
            res.status(500).json(`login error: ${err}`);
        }
    }

    // logging out user and deleting session
    static async logoutUser(req, res, next) {
        req.session.destroy((err) => {
            if (err) throw err;

            // remove cookie with session id
            res.clearCookie('connect.sid');
            res.send('Logged out successfully');
        })
    }

    // updating a user
    static async updateUser(req, res, next) {
        try{
            // the id in body is of user who is attempted to be updated
            // the id in the param is currently logged user
            if(req.body._id === req.params.id) {
                if(req.body.password) {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password);
                }
                const updateUser = await User.findByIdAndUpdate(
                    req.params.id, // searching by req.body.id won't work here. why?
                    {
                        '$set': req.body
                    },
                    {
                        new: true // return the modified doc instead of the original
                    }
                );
                res.status(200).json(updateUser);
            } else {
                res.status(401).json('you can only update your own account');
            }
        } catch(err) {
            
        }
    }

    // deleting a user
    static async deleteUser(req, res, next) {
        try {
            if(req.params.id === req.body._id) {
                try{
                    const user = User.findById(req.params.id);
                    console.log(req.params.id);
                    await Comment.deleteMany({ originalPoster: req.params.id });
                    await Article.deleteMany({ author: req.params.id });
                    await Follows.deleteMany({ follows: req.params.id });
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("User has been deleted...");
                } catch(err) {
                    res.status(404).json(err);
                }
            } else{
                res.status(401).json("You can delete only your account!");
            }
        } catch(err) {
            res.status(500).json(err);
        }
    }

    // view a user's profile
    static async viewUser(req, res, next) {
        try{
            const user = await User.findOne({
                userName: req.params.bloggerName
            });
            const userFollowsBlogger = await Follows.findOne({
                follower: req.params.userId,
                follows: req.body.bloggerId
            });
            const articles = await Article.find({
                author: req.body.bloggerId
            });
            const {password, ...others} = user._doc;
            if(userFollowsBlogger) {
                others["isFollower"] = true;
            } else {
                others["isFollower"] = false;
            }
            res.status(200).send({others: others, articles: articles});
        } catch(err) {
            res.status(400).json('User does not exist');
        }
    }
}