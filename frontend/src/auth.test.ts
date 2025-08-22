import { loginSchema, registerSchema } from './utils/schemas/auth';

describe('Authentication Tests', () => {
  
  test('should accept valid login data', () => {
    const data = {
      email: 'user@test.com',
      password: 'Password123!'
    };
    
    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  test('should reject invalid email', () => {
    const data = {
      email: 'invalid-email',
      password: 'Password123!'
    };
    
    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('should accept valid registration data', () => {
    const data = {
      username: 'testuser',
      email: 'test@mail.com',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!'
    };
    
    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  test('should reject mismatched passwords', () => {
    const data = {
      username: 'testuser',
      email: 'test@mail.com',
      password: 'Password123!',
      confirmPassword: 'DifferentPassword123!'
    };
    
    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('should reject weak password', () => {
    const data = {
      email: 'user@test.com',
      password: '123'
    };
    
    const result = loginSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('should reject empty username', () => {
    const data = {
      username: '',
      email: 'test@mail.com',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!'
    };
    
    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('should reject invalid email format', () => {
    const data = {
      username: 'testuser',
      email: 'not-an-email',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!'
    };
    
    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  test('should reject short password', () => {
    const data = {
      username: 'testuser',
      email: 'test@mail.com',
      password: '12345',
      confirmPassword: '12345'
    };
    
    const result = registerSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});