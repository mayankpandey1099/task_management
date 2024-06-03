import { createNewUser } from "../services/userService";

describe('User Service', () => {
  it('should create a new user', () => {
    const user = createNewUser('John Doe', 'john@example.com');
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });
});