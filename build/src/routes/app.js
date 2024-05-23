"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventsValidation_1 = __importDefault(require("../validation/EventsValidation"));
const MetricsHelper_1 = __importDefault(require("../helper/MetricsHelper"));
const app = (0, express_1.default)();
let listOfEvents = [];
const eventsValidation = new EventsValidation_1.default();
const metricHelper = new MetricsHelper_1.default();
app.use(express_1.default.json());
app.post('/events', (request, response) => {
    const event = request.body;
    const validation = eventsValidation.validate(event);
    if (validation instanceof Error) {
        response.status(400).send(validation.message);
    }
    else {
        listOfEvents.push(event);
        response.send(event);
    }
});
app.get('/metrics', (request, response) => {
    const listOfEventsLast24Hours = metricHelper.filterLast24HourEvents(listOfEvents);
    let metrics = {
        counts: {
            'NewDevice': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'NewDevice'; }).length,
            'SignIn': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'SignIn'; }).length,
            'CreateItem': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'CreateItem'; }).length,
            'DeleteItem': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'DeleteItem'; }).length,
            'ViewItem': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'ViewItem'; }).length,
        }
    };
    response.send(metrics);
});
exports.default = app;
//# sourceMappingURL=app.js.map