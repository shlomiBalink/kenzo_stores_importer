import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TechnicalSalesforceModule, TechnicalSalesforceService } from './salesforce';
import { MapperModule } from './mapper/mapper.module';
import { ElasticModule } from './elastic/elastic.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, TechnicalSalesforceModule.register(), MapperModule, ElasticModule],
  providers: [AppService,TechnicalSalesforceModule],
})
export class AppModule {}
