import bcrypt from 'bcryptjs';
import type { UserRepository } from '../../application/ports/repository/userRepository.js';
import type { User } from '../../domain/models/user.js';

const seededUsers: User[] = [
  {
    id: 'admin-001',
    email: 'admin@knowledgebase.local',
    username: 'admin',
    passwordHash: bcrypt.hashSync('Admin@123', 10),
    role: 'Admin',
    department: 'Management',
    position: 'Manager',
  },
  {
    id: 'user-001',
    email: 'normal.user@knowledgebase.local',
    username: 'normaluser',
    passwordHash: bcrypt.hashSync('User@123', 10),
    role: 'Normal User',
    department: 'Design',
    position: 'Team Leader',
  },
];

export class SeededUserRepository implements UserRepository {
  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const normalizedIdentifier = identifier.trim().toLowerCase();

    return (
      seededUsers.find(
        (user) =>
          user.email.toLowerCase() === normalizedIdentifier ||
          user.username.toLowerCase() === normalizedIdentifier,
      ) ?? null
    );
  }

  async findById(id: string): Promise<User | null> {
    return seededUsers.find((user) => user.id === id) ?? null;
  }
}
