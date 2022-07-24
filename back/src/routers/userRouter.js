import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { userAuthService } from '../services/userService';
import { validator } from '../middlewares/validator'

const userAuthRouter = Router();

userAuthRouter.post('/user/register',validator('registerScema'), async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    const { nickname, email, password, sex, birth, interest, likeType } =
      req.body;

    const newUser = await userAuthService.addUser({
      nickname,
      email,
      password,
      sex,
      birth,
      interest,
      likeType,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post('/user/login', validator('loginScema'), async function (req, res, next) {
  try {
    const { email, password}  = req.body;
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  '/user/current',
  loginRequired,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const userId = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        userId,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).json(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  '/user/attendanceCheck',
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      let currentUserInfo = await userAuthService.getUserInfo({ userId });
      const attendance = new Date();
      const savedAttendance = currentUserInfo.attendance;
      var timeDiff = attendance - savedAttendance;
      if (timeDiff >= 24 * 60 * 60 * 1000) {
        // isPointGiven === false -> 포인트 지급  isPointGiven === true -> 포인트 지급 X
        const isPointGiven = !currentUserInfo.isPointGiven;
        const toUpdate = { attendance, isPointGiven };
        currentUserInfo = await userAuthService.setUser({ userId, toUpdate });
        if (currentUserInfo.errorMessage) {
          throw new Error(currentUserInfo.errorMessage);
        }
      }

      res.status(200).json({ isPointGiven: currentUserInfo.isPointGiven });
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  '/user/checkIn',
  loginRequired,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      let currentUserInfo = await userAuthService.getUserInfo({ userId });

      const point = currentUserInfo.point + 1000;
      const attendance = new Date();
      const isPointGiven = !currentUserInfo.isPointGiven;
      const toUpdate = { point, attendance, isPointGiven };
      currentUserInfo = await userAuthService.setUser({ userId, toUpdate });
      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }
      res.status(200).json({ point: currentUserInfo.point });
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  '/user/profileModify',
  validator('profileModifyScema'),
  loginRequired,
  async function (req, res, next) {
    try {
      console.log(req.body)
      const userId = req.currentUserId;
      let currentUserInfo = await userAuthService.getUserInfo({ userId });
      const nickname = req.body.nickname ?? null;
      const likeType = req.body.likeType ?? null;
      const profileImg = req.body.profileImg ?? null;
      const interest = req.body.interest ?? null;

      const toUpdate = { nickname, likeType, profileImg, interest };

      currentUserInfo = await userAuthService.setUser({
        userId,
        toUpdate,
      });
      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }
      res.status(200).json({ currentUserInfo });
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  '/user/changePassword',
  validator('changePasswordScema'),
  loginRequired,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body) || !req.body.password) {
        throw new Error('변경할 패스워드를 입력해주세요.');
      }

      const userId = req.currentUserId;
      const password = req.body.password;

      const user = await userAuthService.changePassword({ userId, password });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
