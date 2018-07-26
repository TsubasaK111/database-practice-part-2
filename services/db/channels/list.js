module.exports = (knex, Channel) => {
  return () => {
    return knex("channels")
      .select()
      .then((channels) => {
        const allChannels = [];
        for (let i = 0; i < channels.length; i++) {
          allChannels.push(new Channel(channels[i]));
        }
        return allChannels;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};
