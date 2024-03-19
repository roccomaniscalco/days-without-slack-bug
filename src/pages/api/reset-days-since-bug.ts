import type { APIRoute } from "astro";
import { Channel, db, eq } from "astro:db";

export const POST: APIRoute = async () => {
  await db
    .update(Channel)
    .set({ daysSinceBug: 0 })
    .where(eq(Channel.name, "squad-special-forces"));

  return new Response(JSON.stringify({ daysSinceBug: 0 }), { status: 200 });
};
