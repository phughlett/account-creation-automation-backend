/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('systems',(table) => {
  // system ID, IAO, Security Manager, System Admin
  table.increments('id').primary();
  table.string("system_name").notNullable();
  table.string("iao_name").notNullable();
  table.string("iao_phonenum").notNullable();
  table.string("sec_man_name").notNullable();
  table.string("sec_man_phonenum").notNullable();
  table.string("info_owner_name").notNullable();
  table.string("info_owner_phonenum").notNullable();

})
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("systems");
};
