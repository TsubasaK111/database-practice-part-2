exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("from_id")
      .unsigned()
      .notNullable();

    t.foreign("from_id")
      .references("id")
      .inTable("users");

    t.integer("to_id")
      .unsigned()
      .notNullable();

    t.foreign("to_id")
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
  return knex.schema.dropTable("user_messages");
};
