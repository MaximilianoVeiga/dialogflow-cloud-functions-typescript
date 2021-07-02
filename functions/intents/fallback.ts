const { setResponse, findArray, formatGoogleAssistantToGenesysPayload } = require("../utils");
const fallbackResponses = require("../responses/fallback");

let fallbackIntents = {
  "Default Fallback Intent": (agent) => {
    formatGoogleAssistantToGenesysPayload(agent);

    setResponse(agent, findArray(fallbackResponses, 'Default Fallback Intent'));
  },
};

module.exports = fallbackIntents;
