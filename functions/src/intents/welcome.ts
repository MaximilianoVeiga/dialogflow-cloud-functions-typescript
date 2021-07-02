import {
  addMessage,
  setFollowupEvent,
} from "../utils";

let welcomeIntents = {
  "Default Welcome Intent": (agent: any) => {
    addMessage(agent, ["Sair", "Sobre"], "suggestion");
  },
  "About Intent": (agent: any) => {
    addMessage(agent, "Exemplo de mensagem", "message");
  },
  "End Conversation Intent": (agent: any) => {
    addMessage(agent, "Exemplo de mensagem", "message");
  },
  "Question": (agent: any) => {
    setFollowupEvent(agent, "waiting_request");
  },
};

export default welcomeIntents;
