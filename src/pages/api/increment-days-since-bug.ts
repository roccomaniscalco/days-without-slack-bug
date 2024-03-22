import type { APIRoute } from "astro";
import { Channel, db, eq } from "astro:db";

export const GET: APIRoute = async () => {
  const channels = await db.select().from(Channel);

  for (const channel of channels) {
    const { daysSinceBug, highestDaysSinceBug, id } = channel;
    const newDaysSinceBug = daysSinceBug + 1;

    if (newDaysSinceBug > highestDaysSinceBug) {
      await db
        .update(Channel)
        .set({
          daysSinceBug: newDaysSinceBug,
          highestDaysSinceBug: newDaysSinceBug,
        })
        .where(eq(Channel.id, id));
    } else {
      await db
        .update(Channel)
        .set({ daysSinceBug: newDaysSinceBug })
        .where(eq(Channel.id, id));
    }
  }

  return new Response(`${channels.length} channels have been incremented`, {
    status: 200,
  });
};
