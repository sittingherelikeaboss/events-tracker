"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./routes/app"));
const PORT = 5000;
app_1.default.listen(PORT, () => console.log(`running on port ${PORT}`));
//# sourceMappingURL=server.js.map