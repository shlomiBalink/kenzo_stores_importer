import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class ElasticService {
    private static readonly LOG_CONTEXT = "ElasticService";

    constructor(private readonly elasticsearchService: ElasticsearchService, private loggerService: LoggerService) {
        this.loggerService.setContext(ElasticService.LOG_CONTEXT);
    }

    async pushToElastic(indexName: string, stores) {

        const indexExits = await this.elasticsearchService.indices.exists({ index: indexName });

        if (indexExits) {
            const deleteWorks = await this.elasticsearchService.indices.delete({ index: indexName });
            
            if(deleteWorks.acknowledged){
                this.loggerService.debug('previous index deleted');  
            }
            else{
                this.loggerService.error('error in deleting index')
            }
        }

        const createWorks = await this.elasticsearchService.indices.create({ index: indexName }); 
        if(createWorks.acknowledged){
            this.loggerService.debug('new index created');  
        }
        else{
            this.loggerService.error('error in creteing index')
        }
        const operations = stores.flatMap(doc => [{ index: { _index: indexName } }, doc]);

        await this.elasticsearchService.bulk({ refresh: false, operations });

        this.loggerService.debug('importer done!')
    }
}
