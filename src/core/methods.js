import settings from 'settings';

const v1common = settings.edo(settings.defaultCulture);
const v1 = v1common + '/admin';

const apiMethods = {
    counterparties: `${v1}/counterparties`,
    counterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}`,
    verifyCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify`,
    verifyReadonlyCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify/read-only`,
    agencies: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/agencies`,
    activateCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/activate`,
    deactivateCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/deactivate`,
    activateAgency: (agencyId) => `${v1}/counterparties/agencies/${agencyId}/activate`,
    deactivateAgency: (agencyId) => `${v1}/counterparties/agencies/${agencyId}/deactivate`,
    contractFile: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/contract-file`,
    createPaymentLink: `${v1common}/external/payment-links`,
    createPaymentLinkAndSend: `${v1common}/external/payment-links/send`,

    // /{culture}/api/{v}/admin/agencies/{agencyId}/system-settings/displayed-payment-options get put
    // /{culture}/api/{v}/admin/agencies/{agencyId}/system-settings/availability-search get put

    // /{culture}/api/{v}/admin/agencies/{agencyId}/agents/{agentId}/system-settings/availability-search put get
    // /{culture}/api/{v}/admin/agencies/{agencyId}/agents/{agentId}/change-agency post

    // /{culture}/api/{v}/admin/accommodations/bookings/{bookingId}/discard
    // /{culture}/api/{v}/admin/accommodations/bookings/{bookingId}/cancel

    // /{culture}/api/{v}/admin/accommodation-duplicate-reports get
    // /{culture}/api/{v}/admin/accommodation-duplicate-reports/{id} get
    // /{culture}/api/{v}/admin/accommodation-duplicate-reports/{reportId}/approve post
    // /{culture}/api/{v}/admin/accommodation-duplicate-reports/{reportId}/disapprove post

    // predictions: `${v1}/counterparties/predictions`, //get ?query=
    // put ​/{culture}​/api​/{v}​/admin​/counterparties​/{counterpartyId}​/verification-state Sets counterparty fully verified.
};

export default apiMethods;
