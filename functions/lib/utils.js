"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dialogflow_fulfillment_helper_1 = require("dialogflow-fulfillment-helper");
require("dotenv").config();
function setSuggestion(agent, title, suggestions) {
    const platform = agent.source;
    if (platform != null && platform != "GENESYS") {
        const currentSuggestions = new dialogflow_fulfillment_helper_1.Suggestion({
            title: title,
            reply: suggestions[0],
            platform: platform,
        });
        for (let index = 1; index < suggestions.length; index++) {
            currentSuggestions.addReply_(suggestions[index]);
        }
        agent.add(currentSuggestions);
    }
    else {
        let chipsMap = [];
        for (let index = 0; index < suggestions.length; index++) {
            chipsMap[index] = {
                text: suggestions[index],
            };
        }
        const response = {
            richContent: [
                [
                    {
                        type: "chips",
                        options: chipsMap,
                    },
                ],
            ],
        };
        agent.add(title);
        agent.add(new dialogflow_fulfillment_helper_1.Payload(agent.UNSPECIFIED, response, {
            rawPayload: true,
            sendAsMessage: true,
        }));
    }
}
exports.setSuggestion = setSuggestion;
function formatGoogleAssistantToGenesysPayload(agent) {
    if (agent.source === "GENESYS") {
        const googleAssistantPayload = [];
        agent.request_.body.queryResult.fulfillmentMessages.map((item) => {
            var _a, _b;
            if ((item === null || item === void 0 ? void 0 : item.platform) === "ACTIONS_ON_GOOGLE" && ((_b = (_a = item === null || item === void 0 ? void 0 : item.simpleResponses) === null || _a === void 0 ? void 0 : _a.simpleResponses[0]) === null || _b === void 0 ? void 0 : _b.ssml)) {
                googleAssistantPayload.push(item);
            }
        });
        let modifiedPayload = {
            text: {
                text: [
                    googleAssistantPayload[0].simpleResponses.simpleResponses[0].ssml,
                ],
            },
        };
        agent.request_.body.queryResult.fulfillmentMessages = [];
        agent.request_.body.queryResult.fulfillmentMessages.push(modifiedPayload);
        agent.responseMessages_ = [];
        agent.responseMessages_.push(new dialogflow_fulfillment_helper_1.Text(googleAssistantPayload[0].simpleResponses.simpleResponses[0].ssml));
    }
    else {
        agent.request_.body.queryResult.fulfillmentMessages.map((item) => {
            var _a, _b;
            if ((_a = item === null || item === void 0 ? void 0 : item.text) === null || _a === void 0 ? void 0 : _a.text[0]) {
                addMessage(agent, (_b = item === null || item === void 0 ? void 0 : item.text) === null || _b === void 0 ? void 0 : _b.text[0], "message");
            }
        });
    }
    return agent;
}
exports.formatGoogleAssistantToGenesysPayload = formatGoogleAssistantToGenesysPayload;
function setFollowupEvent(agent, event) {
    agent.setFollowupEvent(event);
}
exports.setFollowupEvent = setFollowupEvent;
function addMessage(agent, message, type) {
    let modifiedPayload;
    // console.log(agent.request_.body.queryResult.fulfillmentMessages);
    if (type === "message" || !type) {
        modifiedPayload = { text: { text: [message] } };
        agent.responseMessages_.push(new dialogflow_fulfillment_helper_1.Text(message));
    }
    else if (type === "suggestion" || !type) {
        let chipsMap = [];
        for (let index = 0; index < message.length; index++) {
            chipsMap[index] = {
                text: message[index],
            };
        }
        modifiedPayload = {
            richContent: [
                [
                    {
                        type: "chips",
                        options: chipsMap,
                    },
                ],
            ],
        };
        agent.responseMessages_.push(new dialogflow_fulfillment_helper_1.Payload(agent.UNSPECIFIED, modifiedPayload, {
            rawPayload: true,
            sendAsMessage: true,
        }));
    }
    agent.request_.body.queryResult.fulfillmentMessages.push(modifiedPayload);
    return agent;
}
exports.addMessage = addMessage;
function setCard(agent, title, subtitle, cardText, cardURL, cardImage) {
    const platform = agent.source;
    if (platform != null && platform != "GENESYS") {
        const anotherCard = new dialogflow_fulfillment_helper_1.Card({
            title: title,
            text: subtitle,
            buttonText: cardText,
            buttonUrl: cardURL,
            platform: platform,
        });
        agent.add(anotherCard);
    }
    else {
        const response = {
            richContent: [
                [
                    {
                        type: "image",
                        rawUrl: cardImage,
                    },
                    {
                        type: "info",
                        title: title,
                        subtitle: subtitle,
                        actionLink: cardURL,
                    },
                ],
            ],
        };
        agent.add(title);
        agent.add(new dialogflow_fulfillment_helper_1.Payload(agent.UNSPECIFIED, response, {
            rawPayload: true,
            sendAsMessage: true,
        }));
    }
}
exports.setCard = setCard;
function setResponse(agent, responses) {
    const platform = agent.source;
    responses.map((response) => {
        if (platform === "GENESYS") {
            // const ssmlText = new Text(response.text);
            // ssmlText.setSsml(response.ssml);
            agent.add(response.ssml);
        }
        else {
            agent.add(response.text);
        }
    });
}
exports.setResponse = setResponse;
function setLink(agent, link, text) {
    const platform = agent.source;
    if (platform != null) {
        agent.add(text);
    }
    else {
        const response = {
            richContent: [
                [
                    {
                        link: link,
                        text: text,
                        icon: {
                            type: "link",
                            color: "#FFFFFF",
                        },
                        type: "button",
                    },
                ],
            ],
        };
        agent.add(new dialogflow_fulfillment_helper_1.Payload(agent.UNSPECIFIED, response, {
            rawPayload: true,
            sendAsMessage: true,
        }));
    }
}
exports.setLink = setLink;
function setImage(agent, imageUrl) {
    const platform = agent.source;
    if (platform != null) {
        const anotherImage = new dialogflow_fulfillment_helper_1.Image(imageUrl);
        agent.add(anotherImage);
    }
}
exports.setImage = setImage;
function findArray(response, title) {
    return response.find((element) => element[`${title}`])[`${title}`];
}
exports.findArray = findArray;
//# sourceMappingURL=utils.js.map