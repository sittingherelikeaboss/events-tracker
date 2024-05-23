"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventsValidation_1 = __importDefault(require("../../src/validation/EventsValidation"));
describe('Test Events Validation', () => {
    let event;
    const eventValidation = new EventsValidation_1.default();
    beforeEach(() => {
        event = {
            "timestamp": "2024-05-04T05:57:46Z",
            "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
            "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            "eventType": "SignIn"
        };
    });
    it('Should validate event', () => {
        const validation = eventValidation.validate(event);
        expect(validation).toStrictEqual(true);
    });
    it('Should be invalid event type', () => {
        event.eventType = 'SignInn';
        const validation = eventValidation.validate(event);
        expect(validation).toBeInstanceOf(Error);
    });
});
//# sourceMappingURL=EventsValidation.test.js.map