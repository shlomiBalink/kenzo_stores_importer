export interface Attributes {
    type: string;
    url: string;
  }
  
  export interface KzoGeometryC {
    latitude: number;
    longitude: number;
  }
  
  export interface Attributes2 {
    type: string;
    url: string;
  }
  
  export interface KzoSupplyStorageLocationR {
    attributes: Attributes2;
    kzo_storecode__c: string;
  }
  
  export interface SalesforceRecord {
    attributes: Attributes;
    kzo_storecode__c: string;
    Name: string;
    kzo_address_EN_address1__c: string;
    kzo_address_EN_city__c: string;
    kzo_address_EN_postal_Code__c: string;
    kzo_address_EN_country_Code__c: string;
    kzo_address_EN_state_Code__c?: any;
    kzo_phone_country_Number__c: string;
    kzo_phone_phone_Number__c: string;
    kzo_geometry__c: KzoGeometryC;
    kzo_location_Type__c: string;
    kzo_supply_storage_location__r: KzoSupplyStorageLocationR;
  }
  
  export interface SalesforceRecordArray {
    totalSize: number;
    done: boolean;
    records: SalesforceRecord[];
  }
  
  
  export interface Location {
    lat?: number;
    lon?: number;
  }
  
  export interface MappedRecord {
    id?: string;
    name?: string;
    address1?: string;
    city?: string;
    postalCode?: string;
    countryCode?: string;
    stateCode?: any;
    location?: Location;
    type?: string;
    warehouse?: any;
    phone?: string;
  }

  export const mapper_store_kenzo = {
    "id": "kzo_storecode__c",
    "name": "Name",
    "address1": "kzo_address_EN_address1__c",
    "city": "kzo_address_EN_city__c",
    "postalCode": "kzo_address_EN_postal_Code__c",
    "countryCode": "kzo_address_EN_country_Code__c",
    "stateCode": "kzo_address_EN_state_Code__c",
    "location": "kzo_geometry__c",
    "type": "kzo_location_Type__c",
  };

  export const queryArgs = [
    'kzo_storecode__c',
    'Name',
    'kzo_address_EN_address1__c',
    'kzo_address_EN_city__c',
    'kzo_address_EN_postal_Code__c',
    'kzo_address_EN_country_Code__c',
    'kzo_address_EN_state_Code__c',
    'kzo_phone_country_Number__c',
    'kzo_phone_phone_Number__c',
    'kzo_geometry__c',
    'kzo_location_Type__c',
    'kzo_supply_storage_location__r.kzo_storecode__c',
  ]