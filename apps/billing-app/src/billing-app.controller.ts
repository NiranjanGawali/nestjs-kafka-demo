import { Controller, Get } from '@nestjs/common';
import { BillingAppService } from './billing-app.service';
import { EventPattern } from '@nestjs/microservices';
import { KafkaConsumerService } from '@app/kafka';
import { AppConfigService } from '@app/config';

@Controller()
export class BillingAppController {
  constructor(
    private readonly billingAppService: BillingAppService,
    private readonly consumer: KafkaConsumerService,
    private readonly config: AppConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingAppService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(data: any) {
    console.log('In handleOrderCreated method....');

    this.billingAppService.handleOrderCreated(data);
  }

  async onModuleInit() {
    await this.consumer.consume({
      topic: { topic: this.config.kafka.topic },
      config: { groupId: 'test-consumer-2' },
      onMessage: async (message) => {
        console.log('Niranjan Gawali');

        console.log({ value: message.value.toString() });
      },
    });
  }
}
