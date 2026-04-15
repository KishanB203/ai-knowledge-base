import type { NextFunction, Request, Response } from 'express';
import type { AuthenticatedUser } from '../../../domain/models/user.js';
import type { TokenService } from '../../../application/ports/security/tokenService.js';

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function createAuthMiddleware(tokenService: TokenService) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const header = req.header('authorization');
    const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication is required.',
      });
      return;
    }

    const user = tokenService.verify(token);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Session expired or invalid. Please log in again.',
      });
      return;
    }

    req.user = user;
    next();
  };
}
