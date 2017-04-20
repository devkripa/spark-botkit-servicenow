const serviceNowClient = require('../service_now_client.js');

const incidentCreate = (controller) => {
  controller.hears(['incident create <(.*)> <(.*)>'], 'direct_message, direct_mention', (bot, message) => {
    const incident = {
      short_description: message.match[1],
      category: message.match[2],
      caller_id: message.user,
    };

    return serviceNowClient.insertTableRecord('incident', incident)
      .then((response) => {
        const responseString = `\`\`\`${JSON.stringify(response, null, 2)}`;
        bot.reply(message, responseString);
      })
      .catch((error) => {
        bot.reply(message, `Sorry, I was unable to create your incident: ${error}`);
      });
  });
};

module.exports = incidentCreate;
