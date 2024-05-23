import express from 'express';
import { Event } from 'interfaces/Event';
import { Metrics } from 'interfaces/Metrics';
import EventsValidation from '../validation/EventsValidation';
import MetricHelper from '../helper/MetricsHelper';

const app = express();
let listOfEvents: Event[] = [];
const eventsValidation: EventsValidation = new EventsValidation();
const metricHelper: MetricHelper = new MetricHelper();

app.use(express.json());

app.post('/events', (request, response) => {
    const event: Event = request.body;
    const validation: boolean | Error = eventsValidation.validate(event);
    if (validation instanceof Error) {
        response.status(400).send(validation.message);
    } else {
        listOfEvents.push(event);
        response.send(event);
    }
});

app.get('/metrics', (request, response) => {
    const listOfEventsLast24Hours: Event[] = metricHelper.filterLast24HourEvents(listOfEvents);
    let metrics: Metrics = {
        counts: {
            'NewDevice': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'NewDevice'}).length,
            'SignIn': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'SignIn'}).length,
            'CreateItem': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'CreateItem'}).length,
            'DeleteItem': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'DeleteItem'}).length,
            'ViewItem': listOfEventsLast24Hours.filter((obj) => { return obj.eventType === 'ViewItem'}).length,
            }
    }
    response.send(metrics);
});

export default app;