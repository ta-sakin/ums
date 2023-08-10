import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  exp: string
) => {
  return jwt.sign(
    {
      id: payload.id,
      role: payload.role,
    },
    secret,
    {
      expiresIn: exp,
    }
  );
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
export { createToken, verifyToken };
