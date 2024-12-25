import { Module } from '@nestjs/common';
import { BillingAppController } from './billing-app.controller';
import { BillingAppService } from './billing-app.service';
import { AppConfigModule } from '@app/config';
import { KafkaModule } from '@app/kafka';

@Module({
  imports: [AppConfigModule, KafkaModule],
  controllers: [BillingAppController],
  providers: [BillingAppService],
})
export class BillingAppModule {}
