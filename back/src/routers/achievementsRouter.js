import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { achievementsService } from '../services/achievementsService';

const achievementsRouter = Router();
achievementsRouter.use(loginRequired);

achievementsRouter.get('/achievementList', async (req, res, next) => {
  try {
    const data = await achievementsService.getAchievements();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

achievementsRouter.get('/userAchievementList', async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const userAchievementsList =
      await achievementsService.getSortedUserAchievements({
        userId,
      });
    if (achievementsService.errorMessage) {
      throw new Error(achievementsService.errorMessage);
    }
    res.status(200).json(userAchievementsList);
  } catch (error) {
    next(error);
  }
});

achievementsRouter.post('/addAchievements', async (req, res, next) => {
  try {
    const newAchievements = req.body;
    const updatedAchievements =
      achievementsService.uploadAchievements(newAchievements);

    res.status(200).json(updatedAchievements);
  } catch (error) {
    next(error);
  }
});

export { achievementsRouter };
