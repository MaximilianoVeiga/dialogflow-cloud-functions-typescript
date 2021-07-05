const intents = {
  welcome: require("./welcome"),
  fallback: require("./fallback"),
};

const allIntents = new Map();

for (const [, intentValue] of Object.entries(intents)) {
  for (const [key, value] of Object.entries(intentValue)) {
    allIntents.set(key, value);
  }
}

export default allIntents;
