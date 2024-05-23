import { Event } from "../interfaces/Event";

export default class MetricHelper {
    public filterLast24HourEvents(listOfEvents: Event[]): Event[] {
        const listOfEvents24Hours: Event[] = [];

        const timestamp24HoursAgo: Date = new Date(Date.now());
        timestamp24HoursAgo.setDate(timestamp24HoursAgo.getDate() - 1);

        for (let event of listOfEvents) {
            const eventTimestamp: Date = new Date(event.timestamp);

            if (eventTimestamp > timestamp24HoursAgo) {
                listOfEvents24Hours.push(event);
            }
        }

        return listOfEvents24Hours;
    }
}