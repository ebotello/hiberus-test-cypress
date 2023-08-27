const OpenAI = require("openai");

const sendQuestion = (messages) => {
  const openAI = new OpenAI({
    apiKey: Cypress.env('OPEN_AI_TOKEN'),
    dangerouslyAllowBrowser: true,
  });

  return openAI.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
};

module.exports.sendQuestion = sendQuestion;
