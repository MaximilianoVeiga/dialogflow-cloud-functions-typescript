const {
  Suggestion,
  Card,
  Text,
  Image,
  Payload,
} = require("dialogflow-fulfillment-helper");
require("dotenv").config();

function setSuggestion(agent, title, suggestions) {
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

function formatGoogleAssistantToGenesysPayload(agent) {
  if (agent.source === "GENESYS") {
    const googleAssistantPayload = [];

    agent.request_.body.queryResult.fulfillmentMessages.map((item) => {
        if(item?.platform === "ACTIONS_ON_GOOGLE" && item?.simpleResponses?.simpleResponses[0]?.ssml){
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
    agent.request_.body.queryResult.fulfillmentMessages.map((item) => {
      if (item?.text?.text[0]) {
        addMessage(agent, item?.text?.text[0], "message");
      }
    });
  }
  return agent;
}

function setFollowupEvent(agent, event) {
  agent.setFollowupEvent(event);
}

function addMessage(agent, message, type) {
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

function setCard(agent, title, subtitle, cardText, cardURL, cardImage) {
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

function setResponse(agent, responses) {
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

function setLink(agent, link, text) {
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

function setImage(agent, imageUrl) {
  const platform = agent.source;

  if (platform != null) {
    const anotherImage = new Image(imageUrl);
    agent.add(anotherImage);
  }
}

function findArray(response, title) {
  return response.find((element) => element[`${title}`])[`${title}`];
}

module.exports = {
  setSuggestion,
  setCard,
  setResponse,
  setImage,
  setLink,
  findArray,
  formatGoogleAssistantToGenesysPayload,
  addMessage,
  setFollowupEvent
};
