const a = '/admin';

const apiMethods = {
    counterparties: `${a}/counterparties`,
    counterparty: (counterpartyId) => `${a}/counterparties/${counterpartyId}`,
    counterpartyAccountsList: (counterpartyId) => `${a}/counterparties/${counterpartyId}/accounts`,
    counterpartyMarkups: (counterpartyId) => `${a}/counterparties/${counterpartyId}/markups`,
    verifyCounterparty: (counterpartyId) => `${a}/counterparties/${counterpartyId}/verify-full-access`,
    verifyReadonlyCounterparty: (counterpartyId) => `${a}/counterparties/${counterpartyId}/verify-read-only`,
    agencies: (counterpartyId) => `${a}/counterparties/${counterpartyId}/agencies`,
    agency: (agencyId) => `${a}/agencies/${agencyId}/child-agencies`,
    activateCounterparty: (counterpartyId) => `${a}/counterparties/${counterpartyId}/activate`,
    deactivateCounterparty: (counterpartyId) => `${a}/counterparties/${counterpartyId}/deactivate`,
    activateAgency: (agencyId) => `${a}/counterparties/agencies/${agencyId}/activate`,
    deactivateAgency: (agencyId) => `${a}/counterparties/agencies/${agencyId}/deactivate`,
    agencyAgents: (agencyId) => `${a}/agencies/${agencyId}/agents`,
    contractFile: (counterpartyId) => `${a}/counterparties/${counterpartyId}/contract-file`,
    createPaymentLink: '/external/payment-links',
    createPaymentLinkAndSend: '/external/payment-links/send',
    adminSendInvitation: `${a}/invitations`,
    adminRegister: `${a}/invitations/accept`,

    displayedPaymentOptions: (agencyId) => `${a}/agencies/${agencyId}/system-settings/displayed-payment-options`,
    availabilitySearchOptions: (agencyId) => `${a}/agencies/${agencyId}/system-settings/availability-search`,

    duplicates: `${a}/accommodation-duplicate-reports`,
    duplicate: (id) => `${a}/accommodation-duplicate-reports/${id}`,
    duplicateApprove: (id) => `${a}/accommodation-duplicate-reports/${id}/approve`,
    duplicateDisapprove: (id) => `${a}/accommodation-duplicate-reports/${id}/disapprove`,

    agentSettingsAvailabilitySearch: (agencyId, agentId) => `${a}/agencies/${agencyId}/agents/${agentId}/system-settings/availability-search`,
    agentChangeAgency: (agencyId, agentId) => `${a}/agencies/${agencyId}/agents/${agentId}/change-agency`,

    bookingsByReferenceCode: (referenceCode) => `${a}/bookings/${referenceCode}`,
    bookingsByAgent: (agentId) => `${a}/agents/${agentId}/accommodations/bookings`,
    bookingsByAgency: (agencyId) => `${a}/agencies/${agencyId}/accommodations/bookings`,
    bookingsByCounterparty: (counterpartyId) =>`${a}/counterparties/${counterpartyId}/accommodations/bookings`,
    bookingDiscard: (bookingId) => `${a}/accommodations/bookings/${bookingId}/discard`,
    bookingCancel: (bookingId) => `${a}/accommodations/bookings/${bookingId}/cancel`,

    markupsGlobal: () => `${a}/global-markups`,
    markupGlobal: (id, policyId) => `${a}/global-markups/${policyId}`,

    paymentCompleteManually: (bookingId) => `${a}/payments/offline/accommodations/bookings${bookingId}`,
    paymentConfirm: (bookingId) => `${a}/payments/credit-card/accommodations/bookings${bookingId}/confirm`,
    accountBalance: (counterpartyId, currency) => `${a}/counterparties/${counterpartyId}/counterparty-accounts/${currency}/balance`,
    accountPlusMoney: (counterpartyAccountId) => `${a}/counterparty-accounts/${counterpartyAccountId}/replenish`,
    accountMinusMoney: (counterpartyAccountId) => `${a}/counterparty-accounts/${counterpartyAccountId}/subtract`,
    accountManuallyPlusMoney: (counterpartyAccountId) => `${a}/counterparty-accounts/${counterpartyAccountId}/increase-manually`,
    accountManuallyMinusMoney: (counterpartyAccountId) => `${a}/counterparty-accounts/${counterpartyAccountId}/decrease-manually`,
    agencyAccountManuallyPlusMoney: (agencyAccountId) => `${a}/agency-accounts/${agencyAccountId}/increase-manually`,
    agencyAccountManuallyMinusMoney: (agencyAccountId) => `${a}/agency-accounts/${agencyAccountId}/decrease-manually`,
    transferFromCounterpartyToAgency: (counterpartyAccountId) => `${a}/counterparty-accounts/${counterpartyAccountId}/transfer`,

    supplierConnectivityReport: (from, end) => `${a}/reports/direct-connectivity-report/supplier-wise?from=${from}&end=${end}`,
    agencyConnectivityReport: (from, end) => `${a}/reports/direct-connectivity-report/agency-wise?from=${from}&end=${end}`,
    agencyProductivityReport: (from, end) => `${a}/reports/agencies-productivity-report?from=${from}&end=${end}`,
    fullBookingsReport: (from, end) => `${a}/reports/full-bookings-report?from=${from}&end=${end}`,
    // /counterparties/{counterpartyId}/verification-state
    // /${code}/disable
    // /agencies/{agencyId}/agents/{agentId}/api-client
    // /counterparties/predictions
    // /counterparty-accounts/{counterpartyAccountId}/transfer
};

export default apiMethods;
