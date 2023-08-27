const OpenAI = require("openai");

const sendQuestion = (messages) => {
  const openAI = new OpenAI({
    apiKey: "sk",
    dangerouslyAllowBrowser: true,
  });

  return openAI.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
};

module.exports.sendQuestion = sendQuestion;
