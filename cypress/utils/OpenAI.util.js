const OpenAI = require("openai");

const sendQuestion = (messages) => {
  const openAI = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  return openAI.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
};

module.exports.sendQuestion = sendQuestion;
