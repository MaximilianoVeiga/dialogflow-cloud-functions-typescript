'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const dialogflow_fulfillment_helper_1 = require("dialogflow-fulfillment-helper");
const index_1 = require("./intents/index");
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new dialogflow_fulfillment_helper_1.WebhookClient({ request, response });
    agent.handleRequest(index_1.default);
});
//# sourceMappingURL=index.js.map