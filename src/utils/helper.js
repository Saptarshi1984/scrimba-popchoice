import { openai, supabase } from "../utils/config.js";

export const getMatchedData = async (query) => {
  try {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query,
      encoding_format: "float",
    });

    const queryEmbedding = embeddingResponse.data[0].embedding;

    /* Query supabase for nearest vector match */
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.3,
      match_count: 1,
    });
    
    if(data.length == 0) {

      console.error("No match found. Please try again!");
    }

    const content = data[0].content;
    const title = data[0].title;
    
/*  console.log("Mathced data found.");
    console.log("Searched data:", data[0]);
    console.log('Title:', title);
    console.log('Content:', content); */

    return {content, title};

  } catch (error) {
    console.error("Supabase RPC error:", error.message);
  }
};

const chatHistory = [
  {
    role: "system",
    content: ` You are a movie expert. Recommend movies based on the result and user question.
             Your context is the result of the user query. Artriculate your answer in a way that
             you are suggesting/recomending the movie to the user that you have in the result.
             Do not recommend any movies that are not in the result. Use only the provided context. 
             Please do not make up the answer. If the result is empty then replay accordingly.`,
  },
];

export const getChatMessages = async (result, qustion) => {
  chatHistory.push({
    role: "user",
    content: `Context: ${result} Question: ${qustion}`,
  });
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: chatHistory,
    temperature: 0.5,
    frequency_penalty: 0.5,
  });

  console.log("Messages:", res.choices[0].message.content);
  
  return res.choices[0].message.content;
};
