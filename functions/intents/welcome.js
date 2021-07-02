const {
  addMessage,
  setFollowupEvent,
} = require("../utils");

let welcomeIntents = {
  "Default Welcome Intent": (agent) => {
    addMessage(agent, ["Sair", "Sobre"], "suggestion");
  },
  "About Intent": (agent) => {
    addMessage(agent, "Exemplo de mensagem", "message");
  },
  "End Conversation Intent": (agent) => {
    addMessage(agent, "Exemplo de mensagem", "message");
  },
  "Question": (agent) => {
    setFollowupEvent(agent, "waiting_request");
  },
};

module.exports = welcomeIntents;
