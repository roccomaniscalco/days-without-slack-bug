import { db, Channel } from "astro:db";

export default async function () {
  await db.insert(Channel).values([
    {
      id: 1,
      name: "squad-special-forces",
      daysSinceBug: 0,
      highestDaysSinceBug: 0,
    },
  ]);
}
