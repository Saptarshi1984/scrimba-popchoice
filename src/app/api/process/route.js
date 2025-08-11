import { main, getMatchedData } from "@/utils/helper";

export const runtime = 'nodejs';


export async function POST(req) {
  const { input } = await req.json();

  const result = await main(input);
  
  const matches = await getMatchedData(input);
  const title = matches?.[0]?.title || null;

  return Response.json({ result, title });
}
