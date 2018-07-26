const Promise = require("bluebird");

const validateChannelName = (cName) =>
  typeof cName === "string" && cName.replace(" ", "").length > 3;

module.exports = (knex, Channel) => {
  return (params) => {
    const name = params.name;

    return Promise.try(() => {
      if (!validateChannelName(name))
        throw new Error(
          "Channel name must be provided, and be at least three characters"
        );
    })
      .then(() => knex("channels").insert({ name: name.toLowerCase() }))
      .then(() => {
        return knex("channels")
          .where({ name: name.toLowerCase() })
          .select();
      })
      .then((channels) => new Channel(channels.pop()))
      .catch((err) => {
        // sanitize known errors
        if (err.message.match("duplicate key value"))
          throw new Error("That channel already exists");

        // throw unknown errors
        throw err;
      });
  };
};
