"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetricHelper {
    filterLast24HourEvents(listOfEvents) {
        const listOfEvents24Hours = [];
        const timestamp24HoursAgo = new Date(Date.now());
        timestamp24HoursAgo.setDate(timestamp24HoursAgo.getDate() - 1);
        for (let event of listOfEvents) {
            const eventTimestamp = new Date(event.timestamp);
            if (eventTimestamp > timestamp24HoursAgo) {
                listOfEvents24Hours.push(event);
            }
        }
        return listOfEvents24Hours;
    }
}
exports.default = MetricHelper;
//# sourceMappingURL=MetricsHelper.js.map