import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { SalesforceRecordArray, SalesforceRecord, MappedRecord, mapper_store_kenzo } from 'src/models/models';

@Injectable()
export class MapperService {
    private static readonly LOG_CONTEXT = 'MapperService'

    constructor(private loggerService: LoggerService) {
        this.loggerService.setContext(MapperService.LOG_CONTEXT);
    }

    map(salesforceResponse: SalesforceRecordArray) {

        this.loggerService.debug('starting mapping')
        const responsrArr = [];
        const storeArraySalesforce: SalesforceRecord[] = salesforceResponse.records;

        storeArraySalesforce.forEach(sfObject => {

            const mappedObject = this.mapper(sfObject);

            responsrArr.push(mappedObject)
        })
        this.loggerService.debug('end mapping')

        return responsrArr;
    }

    private mapper = (salesforceStoreRecord: SalesforceRecord) => {
        let mappedObj: MappedRecord = {};

        Object.keys(mapper_store_kenzo).map((key) => {
            mappedObj[key] = salesforceStoreRecord[mapper_store_kenzo[key]];
        })

        mappedObj["phone"] = `${salesforceStoreRecord?.kzo_phone_country_Number__c}${salesforceStoreRecord?.kzo_phone_phone_Number__c}`
        if (typeof salesforceStoreRecord.kzo_geometry__c?.latitude === 'number' && typeof salesforceStoreRecord.kzo_geometry__c?.longitude === 'number') {
            mappedObj["location"] = {
                lat: (salesforceStoreRecord.kzo_geometry__c?.latitude).toFixed(25) as unknown as number,
                lon: (salesforceStoreRecord.kzo_geometry__c?.longitude).toFixed(25) as unknown as number
            }
        }
        else {
            mappedObj["location"] = {
                lat: undefined,
                lon: undefined
            }
        }

        mappedObj["warehouse"] = salesforceStoreRecord?.kzo_supply_storage_location__r?.kzo_storecode__c;

        // return 2 chracters country code insted 3 like SF returns
        mappedObj.countryCode = mappedObj.countryCode.slice(0, -1);      
        
        return mappedObj;
    }

}
