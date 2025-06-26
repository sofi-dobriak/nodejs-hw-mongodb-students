import createHttpError from 'http-errors';
import { userCollection } from '../db/models/user';
import { User } from '../types/user';
import bcrypt from 'bcrypt';
import { sessionCollection } from '../db/models/sessions';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/constants';
import { RefreshSession } from '../types/session';

export const registerUser = async (payload: User) => {
  const existedUser = await userCollection.findOne({ email: payload.email });

  if (existedUser) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await userCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload: User) => {
  const user = await userCollection.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User do not found');
  }

  const areEqualPass = await bcrypt.compare(payload.password, user.password);

  if (!areEqualPass) {
    throw createHttpError(401, 'Unauthorized');
  }

  await sessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await sessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const logoutUser = async (sessionId: string) => {
  await sessionCollection.deleteOne({ _id: sessionId });
};

const createUsersSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUsersSession = async ({
  sessionId,
  refreshToken,
}: RefreshSession) => {
  const session = await sessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  const isSessionTokenExpired = new Date() > new Date(session.refreshToken);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createUsersSession();

  await sessionCollection.deleteOne({ _id: sessionId, refreshToken });

  return await sessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
