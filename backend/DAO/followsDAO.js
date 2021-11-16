import Follows from "../schema/follows.js";
import User from "../schema/user.js";

export default class FollowsDAO {
    // add new follower
    static async addFollower (req, res, next) {
        try {
            const newFollower = new Follows({
                follower: req.params.followerId,
                follows: req.params.followedId
            });
            const followerDoc = await newFollower.save();
            const updatedFollowedUser = await User.findByIdAndUpdate(
                req.params.followedId,
                {
                    $inc: {
                        followedBy: 1
                    }
                },
                {
                    new: true
                }
            );
            const updatedFollower = await User.findByIdAndUpdate(
                req.params.followerId,
                {
                    $inc: {
                        following: 1
                    }
                },
                {
                    new: true
                }
            );
            res.status(200).json(newFollower);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // remove a follower
    static async removeFollower (req, res, next) {
        try {
            //Follows.findByIdAndDelete(req.params.followerId);
            const unfollowedUser = await User.findByIdAndUpdate(
                req.params.followedId,
                {
                    $inc: {
                        followedBy: -1
                    }
                },
                {
                    new: true
                }
            );
            console.log('ok');
            const removedFollower = await User.findByIdAndUpdate(
                req.params.followerId,
                {
                    $inc: {
                        following: -1
                    }
                },
                {
                    new: true
                }
            );
            console.log('ok1');
            await Follows.findOneAndRemove({
                "follower": req.params.followerId,
                "follows": req.params.followedId
            });
            const {password, ...other} = unfollowedUser._doc;
            other["isFollower"] = false;
            res.status(200).json(other);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}