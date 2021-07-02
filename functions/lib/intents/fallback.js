"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const fallback_1 = require("../responses/fallback");
let fallbackIntents = {
    "Default Fallback Intent": (agent) => {
        utils_1.formatGoogleAssistantToGenesysPayload(agent);
        utils_1.setResponse(agent, utils_1.findArray(fallback_1.default, 'Default Fallback Intent'));
    },
};
module.exports = fallbackIntents;
//# sourceMappingURL=fallback.js.map