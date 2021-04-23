import settings from 'settings';

const v1common = settings.edo('en');
const v1 = v1common + '/admin';

const apiMethods = {
    counterparties: `${v1}/counterparties`,
    counterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}`,
    verifyCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify-full-access`,
    verifyReadonlyCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/verify-read-only`,
    agencies: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/agencies`,
    activateCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/activate`,
    deactivateCounterparty: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/deactivate`,
    activateAgency: (agencyId) => `${v1}/counterparties/agencies/${agencyId}/activate`,
    deactivateAgency: (agencyId) => `${v1}/counterparties/agencies/${agencyId}/deactivate`,
    agencyAgents: (agencyId) => `${v1}/agencies/${agencyId}/agents`,
    contractFile: (counterpartyId) => `${v1}/counterparties/${counterpartyId}/contract-file`,
    createPaymentLink: `${v1common}/external/payment-links`,
    createPaymentLinkAndSend: `${v1common}/external/payment-links/send`,
    adminSendInvitation: `${v1}/invitations`,
    adminRegister: `${v1}/invitations/accept`,

    displayedPaymentOptions: (agencyId) => `${v1}/agencies/${agencyId}/system-settings/displayed-payment-options`,
    availabilitySearchOptions: (agencyId) => `${v1}/agencies/${agencyId}/system-settings/availability-search`,

    duplicates: `${v1}/accommodation-duplicate-reports`,
    duplicate: (id) => `${v1}/accommodation-duplicate-reports/${id}`,
    duplicateApprove: (id) => `${v1}/accommodation-duplicate-reports/${id}/approve`,
    duplicateDisapprove: (id) => `${v1}/accommodation-duplicate-reports/${id}/disapprove`,

    agentSettingsAvailabilitySearch: (agencyId, agentId) => `${v1}/agencies/${agencyId}/agents/${agentId}/system-settings/availability-search`,
    agentChangeAgency: (agencyId, agentId) => `${v1}/agencies/${agencyId}/agents/${agentId}/change-agency`,

    bookingsByReferenceCode: (referenceCode) => `${v1}/bookings/${referenceCode}`,
    bookingsByAgent: (agentId) => `${v1}/agents/${agentId}/accommodations/bookings`,
    bookingsByAgency: (agencyId) => `${v1}/agencies/${agencyId}/accommodations/bookings`,
    bookingsByCounterparty: (counterpartyId) =>`${v1}/counterparties/${counterpartyId}/accommodations/bookings`,
    bookingDiscard: (bookingId) => `${v1}/accommodations/bookings/${bookingId}/discard`,
    bookingCancel: (bookingId) => `${v1}/accommodations/bookings/${bookingId}/cancel`,

    markups: `${v1}/markups`,
    markup: (id) => `${v1}/markups/{id}`,
    markupGlobal: `${v1}/global-markups`,
    markupPolicies: (scopeType, scopeId) => `${v1}/markups/${scopeType}/${scopeId}`,
    markupTemplates: `${v1}/markups/templates`,

    paymentCompleteManually: (bookingId) => `${v1}/payments/offline/accommodations/bookings${bookingId}`,
    paymentConfirm: (bookingId) => `${v1}/payments/credit-card/accommodations/bookings${bookingId}/confirm`,
    accountBalance: (counterpartyId, currency) => `${v1}/counterparties/${counterpartyId}/counterparty-accounts/${currency}balance/`,
    accountPlusMoney: (counterpartyAccountId) => `${v1}/counterparty-accounts/${counterpartyAccountId}/replenish`,
    accountMinusMoney: (counterpartyAccountId) => `${v1}/counterparty-accounts/${counterpartyAccountId}/subtract`,
    accountManuallyPlusMoney: (counterpartyAccountId) => `${v1}/counterparty-accounts/${counterpartyAccountId}/increase-manually`,
    accountManuallyMinusMoney: (counterpartyAccountId) => `${v1}/counterparty-accounts/${counterpartyAccountId}/decrease-manually`,
    agencyAccountManuallyPlusMoney: (agencyAccountId) => `${v1}/agency-accounts/${agencyAccountId}/increase-manually`,
    agencyAccountManuallyMinusMoney: (agencyAccountId) => `${v1}/agency-accounts/${agencyAccountId}/decrease-manually`,
    
    // /counterparties/{counterpartyId}/verification-state
    // /${code}/disable
    // /agencies/{agencyId}/agents/{agentId}/api-client
    // /counterparties/predictions
    // /counterparty-accounts/{counterpartyAccountId}/transfer
};

export default apiMethods;
