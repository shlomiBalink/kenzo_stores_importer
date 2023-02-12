import { HttpStatus } from '@nestjs/common';
import jsforce = require('jsforce');

type WhereConditions = string | Record<string, any>;

export type ChatterResourceModifyMethod = 'create' | 'update';

export type RequestApexMethod = 'get' | 'post' | 'delete' | 'patch' | 'put';

export type SFConnCallback<T> = (sfConn: jsforce.Connection) => T;

export interface QuerySObjectOptions {
  objectName: string;
  fieldsToSelect: string[];
  whereConditions: WhereConditions;
  sortOptions?: Record<string, number>;
  limit?: number;
  offset?: number;
}

export interface UserDetails {
  id: string;
  orgId: string;
}

export interface FindOneSObjectOptions {
  objectName: string;
  findQuery: WhereConditions;
}

export const httpSuccessStatusCodes = [
  HttpStatus.OK,
  HttpStatus.CREATED,
  HttpStatus.ACCEPTED,
  HttpStatus.NON_AUTHORITATIVE_INFORMATION,
  HttpStatus.NO_CONTENT,
  HttpStatus.RESET_CONTENT,
  HttpStatus.PARTIAL_CONTENT,
];

export interface OrganizationData {
  features: {
    defaultCurrencyIsoCode?: string;
  };
}

export interface AuthConfig {
  useTechnicalUser?: boolean;
  refreshCache?: boolean;
  authenticatedUsername?: string;
}