import express, { Router } from 'express';
import StatisticsModel from './statistics-model';
import { StatisticWordType } from '../app.api';
import { StatusCodes } from '../config';

const statisticsRouter = Router();

statisticsRouter.get('/', async (request: express.Request, result: express.Response) => {
  try {
    const statistics = await StatisticsModel.find();

    if (!statistics) {
      return result.json({});
    }

    return result.json({ statistics });
  } catch (error) {
    return result
      .status(StatusCodes.InternalServerError)
      .json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.get('/:id', async (request: express.Request, result: express.Response) => {
  try {
    const statisticWord = await StatisticsModel.findOne({ id: request.params.id });

    if (!statisticWord) {
      return result.status(StatusCodes.BadRequest).json({ message: 'Word does not exist' });
    }

    return result.json({ statisticWord });
  } catch (error) {
    return result
      .status(StatusCodes.InternalServerError)
      .json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.delete('/:id', async (request: express.Request, result: express.Response) => {
  try {
    const statisticWord = await StatisticsModel.deleteOne({ id: request.params.id });

    if (!statisticWord) {
      return result.status(StatusCodes.BadRequest).json({ message: 'Word does not exist' });
    }

    return result.json({ statisticWord });
  } catch (error) {
    return result
      .status(StatusCodes.InternalServerError)
      .json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.put('/', async (request: express.Request, result: express.Response) => {
  try {
    const newStatistics: StatisticWordType[] = request.body;

    const statisticWord = await StatisticsModel.bulkWrite(
      newStatistics.map((statistic) => ({
        updateOne: {
          filter: { id: statistic.id },
          update: { guesses: statistic.guesses, mistakes: statistic.mistakes },
        },
      }))
    );

    if (!statisticWord) {
      return result.status(StatusCodes.BadRequest).json({ message: 'Word does not exist' });
    }

    return result.json({ statisticWord });
  } catch (error) {
    return result
      .status(StatusCodes.InternalServerError)
      .json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.put('/:id', async (request: express.Request, result: express.Response) => {
  try {
    const { trained } = request.body;

    const statisticWord = await StatisticsModel.updateOne({ id: request.params.id }, { trained });

    if (!statisticWord) {
      return result.status(StatusCodes.BadRequest).json({ message: 'Word does not exist' });
    }

    return result.json({ statisticWord });
  } catch (error) {
    return result
      .status(StatusCodes.InternalServerError)
      .json({ message: 'Something went wrong. Please try again later' });
  }
});

export default statisticsRouter;
