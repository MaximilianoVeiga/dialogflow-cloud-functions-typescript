"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
let welcomeIntents = {
    "Default Welcome Intent": (agent) => {
        utils_1.addMessage(agent, ["Sair", "Sobre"], "suggestion");
    },
    "About Intent": (agent) => {
        utils_1.addMessage(agent, "Exemplo de mensagem", "message");
    },
    "End Conversation Intent": (agent) => {
        utils_1.addMessage(agent, "Exemplo de mensagem", "message");
    },
    "Question": (agent) => {
        utils_1.setFollowupEvent(agent, "waiting_request");
    },
};
exports.default = welcomeIntents;
//# sourceMappingURL=welcome.js.map