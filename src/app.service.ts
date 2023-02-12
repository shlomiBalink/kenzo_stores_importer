import { TechnicalSalesforceService } from './salesforce';
import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper/mapper.service';
import { ElasticService } from './elastic/elastic.service';
import { SalesforceRecordArray, queryArgs } from './models/models';


@Injectable()
export class AppService {
  
  constructor(
    private salesforceService: TechnicalSalesforceService, 
    private mapperService: MapperService,
    private elasticService: ElasticService
    ) {}

  async salesForceToESStores() {
    const salesforceResponse: SalesforceRecordArray = await this.salesforceService.listToSelect(queryArgs, 'kzo_Store__c');

    const mappedObjects = this.mapperService.map(salesforceResponse);

    this.elasticService.pushToElastic('stores', mappedObjects);

  }
}