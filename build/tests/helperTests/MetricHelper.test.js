"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MetricsHelper_1 = __importDefault(require("../../src/helper/MetricsHelper"));
const MockDate = __importStar(require("mockdate"));
describe('Test Metric Helper', () => {
    let inputEvents;
    let outputEvents;
    const metricsHelper = new MetricsHelper_1.default();
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
        const filteredEvents = metricsHelper.filterLast24HourEvents(inputEvents);
        expect(filteredEvents.length).toStrictEqual(2);
        expect(filteredEvents).toStrictEqual(outputEvents);
    });
});
//# sourceMappingURL=MetricHelper.test.js.map