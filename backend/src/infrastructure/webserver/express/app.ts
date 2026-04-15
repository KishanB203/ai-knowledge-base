import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import { LoginUser } from '../../../application/usecases/loginUser.js';
import type { AppConfig } from '../../config/appConfig.js';
import { SeededUserRepository } from '../../repositories/seededUserRepository.js';
import { BcryptPasswordVerifier } from '../../security/bcryptPasswordVerifier.js';
import { JwtTokenService } from '../../security/jwtTokenService.js';
import { AuthController } from '../../../interface/controller/authController.js';
import { healthRouter } from '../../../interface/routes/healthRoutes.js';
import { createAuthRouter } from '../../../interface/routes/authRoutes.js';

export function createApp(config: AppConfig) {
  const app = express();
  const userRepository = new SeededUserRepository();
  const passwordVerifier = new BcryptPasswordVerifier();
  const tokenService = new JwtTokenService(config.auth);
  const loginUser = new LoginUser(userRepository, passwordVerifier, tokenService);
  const authController = new AuthController(loginUser);

  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: '1mb' }));

  app.use('/api/v1/auth', createAuthRouter(authController, tokenService));
  app.use('/api/v1/health', healthRouter);

  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  app.use(errorHandler);

  return app;
}

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};
