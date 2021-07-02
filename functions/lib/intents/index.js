"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let intents = {
    welcome: require("./welcome"),
    fallback: require("./fallback"),
};
let allIntents = new Map();
for (let [, intentValue] of Object.entries(intents)) {
    for (let [key, value] of Object.entries(intentValue)) {
        allIntents.set(key, value);
    }
}
exports.default = allIntents;
//# sourceMappingURL=index.js.map