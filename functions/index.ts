'use strict';

import functions from 'firebase-functions';
import { WebhookClient } from 'dialogflow-fulfillment-helper';

import intents from './intents/index';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });

    agent.handleRequest(intents);
});
