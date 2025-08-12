import { getMatchedData, getChatMessages } from "@/utils/helper";


export async function POST(req) {
  const { input } = await req.json();  
  const matches = await getMatchedData(input);
  const message= await getChatMessages(matches.content, input);
  const title =  matches.title; 

  return Response.json({ message, title });
  
}
