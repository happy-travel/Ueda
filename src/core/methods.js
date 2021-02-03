import settings from 'settings';

const v1common = settings.edo('en');
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
    adminSendInvitation: `${v1}/management/invite`,
    adminRegister: `${v1}/management/register`,

    displayedPaymentOptions: (agencyId) => `${v1}/agencies/${agencyId}/system-settings/displayed-payment-options`,
    availabilitySearchOptions: (agencyId) => `${v1}/agencies/${agencyId}/system-settings/availability-search`,

    duplicates: `${v1}/accommodation-duplicate-reports`,
    duplicate: (id) => `${v1}/accommodation-duplicate-reports/${id}`,
    duplicateApprove: (id) => `${v1}/accommodation-duplicate-reports/${id}/approve`,
    duplicateDisapprove: (id) => `${v1}/accommodation-duplicate-reports/${id}/disapprove`,

    // /{culture}/api/{v}/admin/agencies/{agencyId}/agents/{agentId}/system-settings/availability-search put get
    // /{culture}/api/{v}/admin/agencies/{agencyId}/agents/{agentId}/change-agency post

    // /{culture}/api/{v}/admin/accommodations/bookings/{bookingId}/discard
    // /{culture}/api/{v}/admin/accommodations/bookings/{bookingId}/cancel

    // predictions: `${v1}/counterparties/predictions`, //get ?query=
    // put ​/{culture}​/api​/{v}​/admin​/counterparties​/{counterpartyId}​/verification-state Sets counterparty fully verified.
    // adminDisableInvitation: (code) => `${v1}/management​/invitations​/${code}​/disable`,
};

export default apiMethods;
