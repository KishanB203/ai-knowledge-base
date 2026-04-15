import type { Request, Response } from 'express';
import type { LoginUser } from '../../application/usecases/loginUser.js';
import type { AuthenticatedRequest } from '../../infrastructure/webserver/express/authMiddleware.js';

export class AuthController {
  constructor(private readonly loginUser: LoginUser) {}

  login = async (req: Request, res: Response) => {
    const result = await this.loginUser.execute({
      identifier: String(req.body.identifier ?? ''),
      password: String(req.body.password ?? ''),
    });

    if (!result.success) {
      res.status(401).json({
        success: false,
        message: result.message,
      });
      return;
    }

    res.json({
      success: true,
      data: result.session,
    });
  };

  me = (req: AuthenticatedRequest, res: Response) => {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  };
}
