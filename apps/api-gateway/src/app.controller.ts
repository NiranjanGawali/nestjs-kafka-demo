import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './app.dto';
import { KafkaProducerService } from '@app/kafka';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producerService: KafkaProducerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createOrderEvent(@Body() payload: CreateOrderDto) {
    return this.appService.createOrderEvent(payload);
  }

  @Post('/kafka')
  kafkatest(@Body() payload: CreateOrderDto) {
    return this.producerService.produce({ value: JSON.stringify(payload) });
  }
}
