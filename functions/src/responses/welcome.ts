const welcomeResponses = [
  {
    "Default Welcome Intent": [
      {
        text: "Olá! Sou o bot de texto da Omnify e estou aqui para tirar dúvidas.",
        ssml: "<speak><s>Olá! Sou o bot de voz da Omnify e estou aqui para tirar dúvidas.</s></speak>",
      },
    ],
  },
  {
    "About Intent": [
      {
        text: "Eu sou um bot de texto desenvolvido pela Omnify!",
        ssml: "<speak><s>Eu sou um bot de voz desenvolvido pela Omnify!</s></speak>",
      },
    ],
  },
  {
    "End Conversation Intent": [
      {
        text: "Obrigado por interagir comigo. Até mais!",
        ssml: "<speak><s>Obrigado por interagir comigo. Até mais!</s></speak>",
      },
    ],
  },
];

module.exports = welcomeResponses;
