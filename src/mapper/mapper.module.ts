import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { TechnicalSalesforceModule } from 'src/salesforce';
import { MapperService } from './mapper.service';

@Module({
  imports: [TechnicalSalesforceModule.register(), LoggerModule],
  providers: [MapperService],
  exports: [MapperService]
})
export class MapperModule {}
