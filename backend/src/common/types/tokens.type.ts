export type JwtPayload = {
  userId: number;
};

export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
};
