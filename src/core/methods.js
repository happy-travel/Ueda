import settings from 'settings';

const v1 = `${settings.edo(settings.defaultCulture)}/admin`;

const apiMethods = {
    getCounterparties: `${v1}/counterparties`, //get
    getCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}`, //get/put
    verifyCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify`, //post
    verifyReadonlyCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify/read-only`, //post
    getAgencies: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/agencies`, //get
    deactivateCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/deactivate`, //put
    deactivateAgency: (agencyId) => `${v1}/counterparties/agencies/${agencyId}/deactivate`, //put
    getPredictions: `${v1}/counterparties/predictions`, //get ?query=
};

export default apiMethods;
