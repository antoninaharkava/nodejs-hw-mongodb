import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw createHttpError(401, 'Unauthorized');
    }

    req.user = user;
    next();
  } catch  {
    next(createHttpError(401, 'Unauthorized'));
  }
};

