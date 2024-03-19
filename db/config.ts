import { column, defineDb, defineTable } from "astro:db";

const Channel = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    daysSinceBug: column.number(),
    highestDaysSinceBug: column.number(),
  },
});

export default defineDb({
  tables: {
    Channel,
  },
});
