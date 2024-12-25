import { NestFactory } from '@nestjs/core';
import { BillingAppModule } from './billing-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(BillingAppModule);
  await app.listen(process.env.port ?? 3000);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'billing',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'billing-consumer',
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
