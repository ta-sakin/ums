import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const auth =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
      }
      let decoded = null;
      try {
        decoded = verifyToken(accessToken, config.jwt.secret as Secret);
      } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token!');
      }

      req.user = decoded;
      if (roles.length && !roles.includes(req.user.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export { auth };
