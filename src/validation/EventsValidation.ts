import { Event } from "../interfaces/Event";

export default class EventsValidation {
    public validate(resource: Event): true | Error {
        const validEventTypes: string[] = ['NewDevice', 'SignIn', 'CreateItem', 'DeleteItem', 'ViewItem'];
        if (!resource.accountId) {
            return Error('Missing accountId');
        } else if (!resource.eventType) {
            return Error('Missing eventType');
        } else if (!resource.timestamp) {
            return Error('Missing timestamp');
        } else if (!resource.userId) {
            return Error('Missing userId');
        } else if (!validEventTypes.includes(resource.eventType)) {
            return Error('Incorrect eventType');
        }
        return true;
    }
}