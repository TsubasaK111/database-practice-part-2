const Promise = require("bluebird");

const validateMessage = (mName) =>
  typeof mName === "string" && mName.length > 1;

module.exports = (knex, ChannelMessage) => {
  return (params) => {
    const channelId = params.channelId;

    return Promise.try(() => {
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
