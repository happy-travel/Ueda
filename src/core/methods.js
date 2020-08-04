import settings from 'settings';

const v1 = `${settings.edo(settings.default_culture)}/admin`;

export default {
    COUNTERPARTIES: `${v1}/counterparties`, //get
    COUNTERPARTY: (counterpartyId) => `${v1}/counterparties/${counterpartyId}`, //get/put
    VERIFY: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify`, //post
    VERIFY_READONLY: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify/read-only`, //post
    AGENCIES: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/agencies`, //get
    DEACTIVATE_COUNTERPARTY: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/deactivate`, //put
    DEACTIVATE_AGENCY: (agencyId) => `${v1}/counterparties/agencies/${agencyId}/deactivate`, //put
    PREDICTION: `${v1}/counterparties/predictions`, //get ?query=
};
