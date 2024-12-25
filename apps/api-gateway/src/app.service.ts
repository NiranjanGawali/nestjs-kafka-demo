import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './app.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created';
import { KafkaProducerService } from '@app/kafka';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingProxyClient: ClientKafka,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createOrderEvent(payload: CreateOrderDto) {
    // create a client proxy
    console.log('Setting up the client proxy');

    this.billingProxyClient.emit(
      'order_created',
      new OrderCreatedEvent('123', payload.userId, payload.price),
    );
  }
}
