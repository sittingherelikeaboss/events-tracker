import MetricsHelper from "../../src/helper/MetricsHelper";
import {
    Event
} from "../../src/interfaces/Event";
import * as MockDate from 'mockdate';

describe('Test Metric Helper', () => {
    let inputEvents: Event[];
    let outputEvents: Event[];
    const metricsHelper: MetricsHelper = new MetricsHelper();

    beforeEach(() => {
        inputEvents = [{
            "timestamp": "2024-05-04T05:57:46Z",
            "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
            "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            "eventType": "SignIn"
        },
        {
            "timestamp": "2024-05-04T04:57:46Z",
            "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
            "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            "eventType": "SignIn"
        },
        {
            "timestamp": "2024-04-04T05:57:46Z",
            "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
            "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            "eventType": "SignIn"
        }];

        outputEvents = [{
            "timestamp": "2024-05-04T05:57:46Z",
            "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
            "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            "eventType": "SignIn"
        },
        {
            "timestamp": "2024-05-04T04:57:46Z",
            "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
            "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            "eventType": "SignIn"
        }];

        MockDate.set('2024-05-04T06:00:00Z');
    });

    it('Should filter last 24 hours events only', () => {
        const filteredEvents: Event[] = metricsHelper.filterLast24HourEvents(inputEvents);
        expect(filteredEvents.length).toStrictEqual(2);
        expect(filteredEvents).toStrictEqual(outputEvents);
    });
})