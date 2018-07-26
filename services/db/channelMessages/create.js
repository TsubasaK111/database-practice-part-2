const Promise = require("bluebird");

const validateMessage = (mName) =>
  typeof mName === "string" && mName.length > 1;

module.exports = (knex, ChannelMessage) => {
  return (params) => {
    const fromId = params.fromId;
    const channelId = params.channelId;
    const message = params.message;

    return Promise.try(() => {
      // TODO: validate fromId and channelId
      if (!validateMessage(message)) throw new Error("Message can't be empty");
    })
      .then(() => {
        return knex("channel_messages").insert({
          from_id: fromId,
          channel_id: channelId,
          message,
        });
      })
      .then(() => {
        return knex("channel_messages")
          .innerJoin("channels", "channels.id", "channel_messages.channel_id")
          .innerJoin("users", "users.id", "channel_messages.from_id")
          .where({ channel_id: channelId })
          .select();
      })
      .then((channelMessages) => {
        return channelMessages.map((channelMessage) => {
          return new ChannelMessage(channelMessage);
        });
      })
      .catch((err) => {
        // sanitize known errors
        // TODO: add known errors

        // throw unknown errors
        throw err;
      });
  };
};
