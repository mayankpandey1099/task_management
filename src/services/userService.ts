import { User } from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';

const users: Map<string, User> = new Map();



export const createUser = (name: string, email: string ): User => {
  const userId = uuidv4();
  const newUser: User = { id: userId, name, email };
  users.set(userId, newUser);
  return newUser;
};