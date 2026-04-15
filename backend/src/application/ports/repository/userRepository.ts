import type { User } from '../../../domain/models/user.js';

export interface UserRepository {
  findByEmailOrUsername(identifier: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
