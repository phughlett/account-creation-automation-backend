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
  table.string("iao_email").notNullable();
  table.string("sec_man_name").notNullable();
  table.string("sec_man_email").notNullable();
  table.string("sys_ad_name").notNullable();
  table.string("sys_ad_email").notNullable();

})
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("systems");
};
