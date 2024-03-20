import { column, defineDb, defineTable } from "astro:db";

const Channel = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    daysSinceBug: column.number(),
    highestDaysSinceBug: column.number(),
  },
  indexes: {
    name_idx: { on: ["name"], unique: true },
  },
});

export default defineDb({
  tables: {
    Channel,
  },
});
