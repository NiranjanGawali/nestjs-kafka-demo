import { Module } from '@nestjs/common';
import { AppConfigModule } from '@app/config';
import { KafkaProducerService } from './kafka.producer.service';
import { KafkaConsumerService } from './kafka.consumer.service';

@Module({
  imports: [AppConfigModule],
  providers: [KafkaConsumerService, KafkaProducerService],
  exports: [KafkaConsumerService, KafkaProducerService],
})
export class KafkaModule {}
