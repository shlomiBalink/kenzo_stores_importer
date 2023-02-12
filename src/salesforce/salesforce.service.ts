import {
    SalesforceJWTBearerFlowService,
    jsforcePromisify,
    SFConnCallback,
    AuthConfig
} from '@lvmh-clienteling/is-svc-common';
import { Injectable } from '@nestjs/common';
import { Connection, ExecuteOptions, QueryResult } from 'jsforce';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class TechnicalSalesforceService {
    private static readonly LOG_CONTEXT = 'SalesforceService'

    private sfConn: Connection;
    private currentUserId: string;

    constructor(
        private sfJwtService: SalesforceJWTBearerFlowService,
        private loggerService: LoggerService
    ) {
        this.loggerService.setContext(TechnicalSalesforceService.LOG_CONTEXT);
    }

    async listToSelect<T>(list: Array<string>, objectName: string, limit?: string | number) {

        // const TwentyFiveHoursAgo = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();

        const sfResponse = await this.query(`SELECT ${list.join(" , ")} FROM ${objectName} where kzo_flag_Ouverture__c = true ${limit ? 'limit ' + limit : ''} `);

        if (sfResponse) {
            this.loggerService.debug('import data from SF done');
        }
        else {
            this.loggerService.error('SF response empty');
        }
        return sfResponse;
    }

    async callWithSfConnection<T>(callback: SFConnCallback<T>): Promise<T> {
        try {
            const sfConnection = await this.getSfConnection(false);
            return await callback(sfConnection);
        } catch (error) {
            if (error.errorCode === 'INVALID_SESSION_ID') {
                const sfConnection = await this.getSfConnection(true);
                return await callback(sfConnection);
            }
            throw error;
        }
    }

    private getAuthConfig(refreshCache = false): AuthConfig {
        return {
            useTechnicalUser: true,
            refreshCache,
        };
    }

    wrapSfError(error: any): any {
        // return jsforceErrorParser(this.logger, error);
    }

    async query<T>(soql: string, options?: ExecuteOptions): Promise<QueryResult<T>> {
        return await this.callWithSfConnection((sfConn) =>
            jsforcePromisify(options ? sfConn.query<T>(soql, options) : sfConn.query<T>(soql)),
        );
    }

    private async getSfConnection(refreshCache = false): Promise<Connection> {
        const authConfig = this.getAuthConfig(refreshCache);
        const { salesForceToken } = await this.sfJwtService.getSalesForceToken(authConfig);
        const credentials = {
            accessToken: salesForceToken.access_token,
            instanceUrl: salesForceToken.instance_url,
        };
        const sfConn = new Connection({ ...credentials, version: '52.0' });

        return sfConn;
    }
}

