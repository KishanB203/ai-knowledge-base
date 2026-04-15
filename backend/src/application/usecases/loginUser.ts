import type { AuthSession } from '../../domain/models/authSession.js';
import { toAuthenticatedUser } from '../../domain/models/user.js';
import type { UserRepository } from '../ports/repository/userRepository.js';
import type { PasswordVerifier } from '../ports/security/passwordVerifier.js';
import type { TokenService } from '../ports/security/tokenService.js';

export interface LoginInput {
  identifier: string;
  password: string;
}

export type LoginResult =
  | {
      success: true;
      session: AuthSession;
    }
  | {
      success: false;
      message: string;
    };

export class LoginUser {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordVerifier: PasswordVerifier,
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const identifier = input.identifier.trim();
    const password = input.password.trim();

    if (!identifier || !password) {
      return {
        success: false,
        message: 'Email or username and password are required.',
      };
    }

    const user = await this.users.findByEmailOrUsername(identifier);
    if (!user) {
      return invalidCredentials();
    }

    const passwordMatches = await this.passwordVerifier.verify(password, user.passwordHash);
    if (!passwordMatches) {
      return invalidCredentials();
    }

    const authenticatedUser = toAuthenticatedUser(user);

    return {
      success: true,
      session: {
        token: this.tokenService.sign(authenticatedUser),
        user: authenticatedUser,
      },
    };
  }
}

function invalidCredentials(): LoginResult {
  return {
    success: false,
    message: 'Invalid email, username, or password.',
  };
}
