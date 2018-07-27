const Promise = require("bluebird");

const validateMessage = (mName) =>
  typeof mName === "string" && mName.length > 1;

module.exports = (knex, UserMessage) => {
  return (params) => {
    const fromId = params.fromId;
    const toId = params.toId;

    return Promise.try(() => {
      return knex("user_messages")
        .innerJoin("users", "users.id", "user_messages.from_id")
        .where({ to_id: toId, from_id: fromId })
        .orWhere({ from_id: toId, to_id: fromId })
        .select();
    })
      .then((userMessages) => {
        return userMessages.map((userMessage) => {
          return new UserMessage(userMessage);
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
