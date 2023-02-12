import { SalesforceJWTBearerFlowModule } from '@lvmh-clienteling/is-svc-common';
import { DynamicModule, Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import {  TechnicalSalesforceService } from './salesforce.service';

@Module({})
export class TechnicalSalesforceModule {
  static register(): DynamicModule {
    return {
      module: TechnicalSalesforceModule,
      imports: [SalesforceJWTBearerFlowModule.register(), LoggerModule],
      providers: [TechnicalSalesforceService],
      exports: [TechnicalSalesforceService],
    };
  }
}