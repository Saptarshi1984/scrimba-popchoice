import { main } from "@/utils/helper";

export async function POST(req) {
  const { input } = await req.json();

  const result = await main(input);

  return Response.json({ result });
}
