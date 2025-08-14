/* import { getMatchedData, getChatMessages } from "@/utils/helper";


export async function POST(req) {
  const { input } = await req.json();  
  const matches = await getMatchedData(input);
  console.log("Matches:", matches);
    const message= await getChatMessages(matches.content, input);
    
    const title =  matches.title;
    return Response.json({ message, title });

} */

import { getMatchedData, getChatMessages } from "@/utils/helper";

export async function POST(req) {
  try {
    const { input } = await req.json();
    const matches = await getMatchedData(input);

    console.log("Matches:", matches);

    // Guard for undefined or missing content
    if (!matches || !matches.content) {
      return Response.json({
        message: "No match found. Please try again!",
        title: null
      });
    }

    const message = await getChatMessages(matches.content, input);
    const title = matches.title || null;

    return Response.json({ message, title });
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "Server error", title: null },
      { status: 500 }
    );
  }
}

