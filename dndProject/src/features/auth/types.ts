export interface Auth {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: 'bearer';
  refreshToken: string;
}
