import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import axios from 'axios';

const port = process.env.APP_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  const hostUrl = await app.getUrl();

  const modifiedHostUrl = hostUrl.replace('[::1]', 'localhost');

  console.log('Application is running on: ' + modifiedHostUrl);

  // Ping server function
  async function pingServer() {

    const url =
      process.env.APP_PING_HOST || modifiedHostUrl;

    try {
      const response = await axios.get(url);
      const requestOk = response.status === 200;

      if (requestOk) console.log(`Server pinged successfully at ${new Date()}`);

      if (!requestOk) console.error(`Failed to ping server. Status code: ${response.status}`);

    } catch (err) {

      console.error(`Error while pinging server: ${err.message}`);
    }
  }

  // Set up the interval to ping the server every 7 minutes
  const pingInterval = 7 * 60 * 1000; // 7 minutes in milliseconds
  setInterval(pingServer, pingInterval);
}

bootstrap();