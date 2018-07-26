module.exports = (knex, User) => {
  return () => {
    return knex("users")
      .select()
      .then((users) => {
        const allUsers = [];
        for (let i = 0; i < users.length; i++) {
          allUsers.push(new User(users[i]));
        }
        return allUsers;
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};
