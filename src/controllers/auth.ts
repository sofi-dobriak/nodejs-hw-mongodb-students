import { RequestHandler, Response } from 'express';
import { loginUser, refreshUsersSession, registerUser } from '../services/auth';
import { ONE_DAY } from '../constants/constants';
import { UserSession } from '../types/session';

export const registerUserController: RequestHandler = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController: RequestHandler = async (req, res) => {
  const session = await loginUser(req.body);

  // res.cookie('refreshToken', session.refreshToken, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });

  // res.cookie('sessionId', session._id, {
  //   httpOnly: true,
  //   expires: new Date(Date.now() + ONE_DAY),
  // });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController: RequestHandler = async (req, res) => {
  const { sessionId } = req.cookies.sessionId;

  if (sessionId) {
    await loginUser(sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

const setupSession = (res: Response, session: UserSession) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController: RequestHandler = async (
  req,
  res,
) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToke: session.accessToken,
    },
  });
};
