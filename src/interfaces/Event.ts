/**
 * @interface Event
 * @description Events from internal system
 */
export interface Event {
    timestamp: string,
    eventType: string,
    accountId: string,
    userId: string,
}