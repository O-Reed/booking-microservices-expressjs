import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import { morganMiddleware } from 'building-blocks/logging/morgan';
import { RegisterRoutes } from './routes/routes';
import config from 'building-blocks/config/config';
import { errorHandler } from 'building-blocks/middlewares/errorHandler';
import { initialRabbitmq } from './extensions/rabbitmqExtensions';
import { registerMediatrHandlers } from './extensions/mediatrExtensions';
import { initialOtel } from './extensions/otelExtensions';
import { initialMonitoring } from './extensions/monitoringExtensions';
import { collectDefaultMetrics } from 'prom-client';
import { postgresOptions, rabbitmqOptions } from './configurations/configuratinOptions';
import { initialDbContext } from './data/dbContext';
import { initialSwagger } from 'building-blocks/swagger/swagger';
import { initialLogger } from './extensions/loggerExtensions';

const startupApp = async () => {
  collectDefaultMetrics();

  const app = express();

  const logger = await initialLogger();

  if (config.env !== 'test') {
    app.use(morganMiddleware);
  }

  await initialMonitoring(app);

  const databaseConnection = await initialDbContext(postgresOptions);

  app.use(helmet());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(compression());

  app.use(cors());
  app.options('*', cors());

  await initialOtel();

  app.use(passport.initialize());

  RegisterRoutes(app);

  app.use(errorHandler);

  app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });

  const rabbitmq = await initialRabbitmq(rabbitmqOptions);

  await registerMediatrHandlers();

  if (config.env !== 'test') {
    await initialSwagger(app);

    process.on('SIGTERM', async () => {
      await databaseConnection.destroy();
      await rabbitmq.closeConnection();
    });
  }
};

startupApp();
