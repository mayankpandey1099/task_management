import { User } from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';
import { Effect } from "effect";


const users: Map<string, User> = new Map();

export const createNewUser = (name: string, email: string): Effect.Effect<User>=>{
    const userId = uuidv4();
    const newUser: User = { id: userId, name, email };
    users.set(userId, newUser);
    return Effect.succeed(newUser);
 };

