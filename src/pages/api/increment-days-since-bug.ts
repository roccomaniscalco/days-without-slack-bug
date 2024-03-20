import type { APIRoute } from "astro";
import { Channel, db, eq } from "astro:db";

export const GET: APIRoute = async () => {
  const channel = (
    await db
      .select({
        daysSinceBug: Channel.daysSinceBug,
        highestDaysSinceBug: Channel.highestDaysSinceBug,
      })
      .from(Channel)
      .where(eq(Channel.name, "squad-special-forces"))
  )[0];

  if (!channel) {
    return new Response(JSON.stringify({ message: "Channel not found" }), {
      status: 404,
    });
  }

  const { daysSinceBug, highestDaysSinceBug } = channel;
  const newDaysSinceBug = daysSinceBug + 1;

  if (newDaysSinceBug > highestDaysSinceBug) {
    await db.update(Channel).set({
      daysSinceBug: newDaysSinceBug,
      highestDaysSinceBug: newDaysSinceBug,
    });
  } else {
    await db.update(Channel).set({ daysSinceBug: newDaysSinceBug });
  }

  return new Response(
    JSON.stringify({
      daysSinceBug: newDaysSinceBug,
    }),
    { status: 200 }
  );
};
