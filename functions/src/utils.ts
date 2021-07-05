import {
  Suggestion,
  Card,
  Text,
  Image,
  Payload,
} from "dialogflow-fulfillment-helper";

require("dotenv").config();

function setSuggestion(agent: any, title: string, suggestions: any[]): void {
  const platform = agent.source;

  if (platform != null && platform != "GENESYS") {
    const currentSuggestions = new Suggestion({
      title: title,
      reply: suggestions[0],
      platform: platform,
    });

    for (let index = 1; index < suggestions.length; index++) {
      currentSuggestions.addReply_(suggestions[index]);
    }

    agent.add(currentSuggestions);
  } else {
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

    agent.add(
      new Payload(agent.UNSPECIFIED, response, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  }
}

function formatGoogleAssistantToGenesysPayload(agent: any): any {
  if (agent.source === "GENESYS") {
    const googleAssistantPayload: any[] = [];

    agent.request_.body.queryResult.fulfillmentMessages.map((item: any) => {
      if (
        item?.platform === "ACTIONS_ON_GOOGLE" &&
        item?.simpleResponses?.simpleResponses[0]?.ssml
      ) {
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
    agent.responseMessages_.push(
      new Text(
        googleAssistantPayload[0].simpleResponses.simpleResponses[0].ssml
      )
    );
  } else {
    agent.request_.body.queryResult.fulfillmentMessages.map((item: any) => {
      if (item?.text?.text[0]) {
        addMessage(agent, item?.text?.text[0], "message");
      }
    });
  }
  return agent;
}

function setFollowupEvent(agent: any, event: any): void {
  agent.setFollowupEvent(event);
}

function addMessage(agent: any, message: string | any[], type: string): any {
  let modifiedPayload;
  // console.log(agent.request_.body.queryResult.fulfillmentMessages);
  if (type === "message" || !type) {
    modifiedPayload = { text: { text: [message] } };
    agent.responseMessages_.push(new Text(message));
  } else if (type === "suggestion" || !type) {
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
    agent.responseMessages_.push(
      new Payload(agent.UNSPECIFIED, modifiedPayload, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  }

  agent.request_.body.queryResult.fulfillmentMessages.push(modifiedPayload);

  return agent;
}

function setCard(
  agent: any,
  title: string,
  subtitle: string,
  cardText: string,
  cardURL: string,
  cardImage: string
): void {
  const platform = agent.source;

  if (platform != null && platform != "GENESYS") {
    const anotherCard = new Card({
      title: title,
      text: subtitle,
      buttonText: cardText,
      buttonUrl: cardURL,
      platform: platform,
    });

    agent.add(anotherCard);
  } else {
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

    agent.add(
      new Payload(agent.UNSPECIFIED, response, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  }
}

function setResponse(agent: any, responses: any[]): void {
  const platform = agent.source;

  responses.map((response) => {
    if (platform === "GENESYS") {
      // const ssmlText = new Text(response.text);
      // ssmlText.setSsml(response.ssml);
      agent.add(response.ssml);
    } else {
      agent.add(response.text);
    }
  });
}

/**
 * Set an link rich payload.
 * @param {any} agent Agent.
 * @param {string} link Link.
 * @param {string} text Text.
 */
function setLink(agent: any, link: string, text: string): void {
  const platform = agent.source;

  if (platform != null) {
    agent.add(text);
  } else {
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

    agent.add(
      new Payload(agent.UNSPECIFIED, response, {
        rawPayload: true,
        sendAsMessage: true,
      })
    );
  }
}

/**
 * Set an image rich payload.
 * @param {any} agent Agent.
 * @param {string} imageUrl Image url.
 */
function setImage(agent: any, imageUrl: string): void {
  const platform = agent.source;

  if (platform != null) {
    const anotherImage = new Image(imageUrl);
    agent.add(anotherImage);
  }
}

/**
 * Search responses array by title.
 * @param {any[]} response Array of responses.
 * @param {string} title Intent to be searched for.
 * @return {response} Returns the intent if found.
 */
function findArray(response: any[], title: string): any {
  return response.find((element) => element[`${title}`])[`${title}`];
}

export {
  setSuggestion,
  setCard,
  setResponse,
  setImage,
  setLink,
  findArray,
  formatGoogleAssistantToGenesysPayload,
  addMessage,
  setFollowupEvent,
};
