exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("channel_id")
      .unsigned()
      .notNullable();

    t.foreign("channel_id")
      .references("id")
      .inTable("channels");

    t.integer("from_id")
      .unsigned()
      .notNullable();

    t.foreign("from_id")
      .references("id")
      .inTable("users");

    t.string("message", 255) // maximum length of 15 characters
      .notNullable(); // add a not-null constraint to this column

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channel_messages");
};
