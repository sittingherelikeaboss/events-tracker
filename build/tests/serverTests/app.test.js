"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/routes/app"));
(0, globals_1.describe)("Test app.ts", () => {
    let req;
    let res;
    beforeAll(() => {
        req = {
            "timestamp": "2024-05-04T05:57:46Z",
            "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
            "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            "eventType": "SignIn"
        };
        res = {
            "counts": {
                "NewDevice": 0,
                "SignIn": 1,
                "CreateItem": 0,
                "DeleteItem": 0,
                "ViewItem": 0
            }
        };
    });
    (0, globals_1.describe)('POST /events', () => {
        it('Events should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const appRes = yield (0, supertest_1.default)(app_1.default).post('/events').send(req);
            (0, globals_1.expect)(appRes.status).toStrictEqual(200);
        }));
        it('Events should return 400 for bad request with bad eventType', () => __awaiter(void 0, void 0, void 0, function* () {
            const reqWithTypo = {
                "timestamp": "2024-05-04T05:57:46Z",
                "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
                "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
                "eventType": "SignInn"
            };
            const appRes = yield (0, supertest_1.default)(app_1.default).post('/events').send(reqWithTypo);
            (0, globals_1.expect)(appRes.status).toStrictEqual(400);
        }));
        it('Events should return 400 for bad request with missing field', () => __awaiter(void 0, void 0, void 0, function* () {
            const reqMissingField = {
                "timestamp": "2024-05-04T05:57:46Z",
                "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
                "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
            };
            const appRes = yield (0, supertest_1.default)(app_1.default).post('/events').send(reqMissingField);
            (0, globals_1.expect)(appRes.status).toStrictEqual(400);
        }));
    });
    (0, globals_1.describe)('GET /metrics', () => {
        it('Metrics should return 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const appRes = yield (0, supertest_1.default)(app_1.default).get('/metrics');
            (0, globals_1.expect)(appRes.status).toStrictEqual(200);
            (0, globals_1.expect)(appRes.body).toStrictEqual(res);
        }));
        it('Metrics should go up when another Sign In event comes in', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default).post('/events').send(req);
            const appRes = yield (0, supertest_1.default)(app_1.default).get('/metrics');
            res = {
                "counts": {
                    "NewDevice": 0,
                    "SignIn": 2,
                    "CreateItem": 0,
                    "DeleteItem": 0,
                    "ViewItem": 0
                }
            };
            (0, globals_1.expect)(appRes.status).toStrictEqual(200);
            (0, globals_1.expect)(appRes.body).toStrictEqual(res);
        }));
        it('Metrics should go up when another New Device event comes in', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.default).post('/events').send({
                "timestamp": "2024-05-04T05:57:46Z",
                "userId": "9ea5ec0c-3e15-4598-82a6-73060dd37090",
                "accountId": "12e839cc-a22c-4a9e-b1df-227fcb2a967f",
                "eventType": "NewDevice"
            });
            const appRes = yield (0, supertest_1.default)(app_1.default).get('/metrics');
            res = {
                "counts": {
                    "NewDevice": 1,
                    "SignIn": 2,
                    "CreateItem": 0,
                    "DeleteItem": 0,
                    "ViewItem": 0
                }
            };
            (0, globals_1.expect)(appRes.status).toStrictEqual(200);
            (0, globals_1.expect)(appRes.body).toStrictEqual(res);
        }));
    });
});
//# sourceMappingURL=app.test.js.map