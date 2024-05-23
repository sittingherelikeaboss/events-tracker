"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventsValidation {
    validate(resource) {
        const validEventTypes = ['NewDevice', 'SignIn', 'CreateItem', 'DeleteItem', 'ViewItem'];
        if (!resource.accountId) {
            return Error('Missing accountId');
        }
        else if (!resource.eventType) {
            return Error('Missing eventType');
        }
        else if (!resource.timestamp) {
            return Error('Missing timestamp');
        }
        else if (!resource.userId) {
            return Error('Missing userId');
        }
        else if (!validEventTypes.includes(resource.eventType)) {
            return Error('Incorrect eventType');
        }
        return true;
    }
}
exports.default = EventsValidation;
//# sourceMappingURL=EventsValidation.js.map