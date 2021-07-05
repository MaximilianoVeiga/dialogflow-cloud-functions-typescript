import { setResponse, findArray, formatGoogleAssistantToGenesysPayload } from "../utils";
import fallbackResponses from "../responses/fallback";

let fallbackIntents = {
  "Default Fallback Intent": (agent: any) => {
    formatGoogleAssistantToGenesysPayload(agent);

    setResponse(agent, findArray(fallbackResponses, 'Default Fallback Intent'));
  },
};

export default fallbackIntents;
