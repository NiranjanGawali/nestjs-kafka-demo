import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingAppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(data: any) {
    console.log('data : ', data);
  }
}
