import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';

// we are here we need to check this login functionality
// we are in 01:30:45 seconds

// create router instance
const router = express.Router();

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Email is required!').isEmail(),
    check('password', 'Password with 6 or more characters required!').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    // destructuring the email and password from request body
    const { email, password } = req.body;
    // try
    try {
      // retreive the user from db if registered
      const user = await User.findOne({ email });
      // if not registered
      if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials!' });
      }
      // compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      // if password not match (incorrect)
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials!' });
      }
      // generate of create new json web token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1d' }
      );
      // build the response cookie
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });

      return res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  }
);

// validate the token
router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

// logout function
router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(0),
  });
  res.send();
});

export default router;
