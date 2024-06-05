import { createNewUser } from "../services/userService";
import {Effect} from "effect";

describe('User Service', () => {
  it('should create a new user', async() => {
    const user = await Effect.runPromise(createNewUser('John Doe', 'john@example.com'));
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });
});