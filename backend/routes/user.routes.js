import express from 'express';
import UserDAO from '../DAO/userDAO.js';

const userRouter = express.Router();

// signup route
userRouter.post('/signup', UserDAO.signupUser);

// login route
userRouter.post('/login', UserDAO.loginUser);

// edit route
userRouter.put('/:id/update', UserDAO.updateUser); //id in param is id of logged in user

// delete route
userRouter.delete('/:id/delete', UserDAO.deleteUser);

// view route
userRouter.get('/:userName/view', UserDAO.viewUser);

export default userRouter;