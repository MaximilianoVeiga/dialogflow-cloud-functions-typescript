import { setResponse, findArray, formatGoogleAssistantToGenesysPayload } from "../utils";
import fallbackResponses from "../responses/fallback";

const fallbackIntents = {
  "Default Fallback Intent": (agent: any): void => {
    formatGoogleAssistantToGenesysPayload(agent);

    setResponse(agent, findArray(fallbackResponses, "Default Fallback Intent"));
  },
};

export default fallbackIntents;
