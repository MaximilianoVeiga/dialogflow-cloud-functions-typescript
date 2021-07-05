import {
  addMessage,
  setFollowupEvent,
} from "../utils";

const welcomeIntents = {
  "Default Welcome Intent": (agent: any): void => {
    addMessage(agent, ["Sair", "Sobre"], "suggestion");
  },
  "About Intent": (agent: any): void => {
    addMessage(agent, "Exemplo de mensagem!", "message");
  },
  "End Conversation Intent": (agent: any): void => {
    addMessage(agent, "Exemplo de mensagem!", "message");
  },
  "Question": (agent: any): void => {
    setFollowupEvent(agent, "waiting_request");
  },
};

export default welcomeIntents;
