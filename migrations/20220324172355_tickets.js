/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("tickets", (table) => {
      table.increments("id").primary();
      table.string("ticket_hash").notNullable();
      table.string("firstname").notNullable();
      table.string("lastname").notNullable();
      table.string("email").notNullable();
      table.integer("systemid").references('id').inTable('systems').notNullable().onDelete('cascade');
      table.boolean("supervisor").notNullable();
      table.boolean("iao").notNullable();
      table.boolean("sec_man").notNullable();
      table.boolean("info_owner").notNullable();
      table.string("formname").notNullable();
      table.string("form_filepath").notNullable();
    });

  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tickets");
};
