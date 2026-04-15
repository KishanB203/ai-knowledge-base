import { Router } from 'express';
import type { AuthController } from '../controller/authController.js';
import type { TokenService } from '../../application/ports/security/tokenService.js';
import { createAuthMiddleware } from '../../infrastructure/webserver/express/authMiddleware.js';

export function createAuthRouter(controller: AuthController, tokenService: TokenService) {
  const router = Router();
  const requireAuth = createAuthMiddleware(tokenService);

  router.post('/login', controller.login);
  router.get('/me', requireAuth, controller.me);

  return router;
}
