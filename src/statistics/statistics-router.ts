import express, { Router } from 'express';
import StatisticsModel from './statistics-model';
import { StatisticWordType } from '../app.api';

const statisticsRouter = Router();

statisticsRouter.get('/', async (request, result) => {
  try {
    const statistics = await StatisticsModel.find();

    if (!statistics) {
      return result.json({});
    }

    return result.json({ statistics });
  } catch (error) {
    return result.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.get('/:id', async (request, result) => {
  try {
    const statisticWord = await StatisticsModel.findOne({ id: request.params.id });

    if (!statisticWord) {
      return result.status(400).json({ message: 'Word does not exist' });
    }

    return result.json({ statisticWord });
  } catch (error) {
    return result.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.delete('/:id', async (request, result) => {
  try {
    const statisticWord = await StatisticsModel.deleteOne({ id: request.params.id });

    if (!statisticWord) {
      return result.status(400).json({ message: 'Word does not exist' });
    }

    return result.json({ statisticWord });
  } catch (error) {
    return result.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.put('/', async (request, result) => {
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
      return result.status(400).json({ message: 'Word does not exist' });
    }

    return result.json({ statisticWord });
  } catch (error) {
    return result.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
});

statisticsRouter.put('/:id', async (request, result) => {
  try {
    const { trained } = request.body;

    const statisticWord = await StatisticsModel.updateOne({ id: request.params.id }, { trained });

    if (!statisticWord) {
      return result.status(400).json({ message: 'Word does not exist' });
    }
  } catch (error) {
    return result.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
});

export default statisticsRouter;
