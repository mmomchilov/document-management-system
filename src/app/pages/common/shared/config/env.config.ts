// Feel free to extend this interface
// depending on your app specific config.
// import { KeycloakService } from '../../../../../keycloak/keycloak.service';

export interface EnvConfig {
  TRANSLATION_URL?: string;
  RR_CODE?: string[];
  MULTISORT?: any;
}

// retrieve from old configuration
export const Config: EnvConfig = {
  // TRANSLATION_URL: KeycloakService.auth.apiUrl + '/internationalization',
  RR_CODE: ['no use!!!'],
  MULTISORT: {
    agreement: [{ code: 'asc' }, { versionAgreement: 'desc' }],
    'policy-ident': [{ legalContractCode: 'asc' }],
    'juridical-entity': [{ legalName: 'asc' }]
  }
};
