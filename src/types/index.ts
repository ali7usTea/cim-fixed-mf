/** Channel the interaction arrived on (proposal §2 — Voice/WhatsApp/Chat/Other). */
export type InteractionChannel = "voice" | "whatsapp" | "chat" | "other";

/**
 * One customer/work item, owned by the Shell. Up to MAX_CONCURRENT_SEARCHES
 * can be open at once; the agent switches the active one via the tab strip.
 */
export interface SearchContext {
    searchId: string; // e.g. "SEARCH-002"
    customerId: string;
    accountNo?: string;
    accountCode?: string;
    partyId?: string;
    contractId?: string;
    email?: string;
    emiratedId?: string;
    passport?: string;

    /** Display identifier shown on the tab (e.g. phone number). */
    label: string;
    channel: InteractionChannel;

    /** id of the MFE currently active for this search (see MfeRegistryEntry.id) */
    activeMfe: string;

    /** set when the interaction is a live call, drives the tab's timer */
    callStartedAt?: number;

    createdAt: number;
}
