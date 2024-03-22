import type { APIRoute } from "astro";
import { Channel, db, eq } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const { channelName } = await request.json();

  if (typeof channelName !== "string") {
    return new Response("Invalid request", { status: 400 });
  }

  await db
    .update(Channel)
    .set({ daysSinceBug: 0 })
    .where(eq(Channel.name, channelName));

  return new Response(JSON.stringify({ daysSinceBug: 0 }), { status: 200 });
};
