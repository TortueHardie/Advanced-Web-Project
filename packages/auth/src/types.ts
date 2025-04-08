export interface JWTPayload {
  userId: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyTokenResult {
  isValid: boolean;
  user?: JWTPayload;
  error?: string;
} 