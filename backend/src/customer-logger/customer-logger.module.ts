import { Module } from '@nestjs/common';
import { CustomerLogger } from './customer-logger';

@Module({
  imports: [CustomerLogger],
  providers: [CustomerLogger],
})
export class CustomerLoggerModule {}
