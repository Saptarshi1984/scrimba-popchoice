
import {openai, supabase} from "../utils/config.js"; 

export async function main(query) {
  
  try {
    const match  = await getMatchedData(query);
     
    /*const movieContent = match[0].content; */
    if(!match || match.length == 0) {

      return  'No match found.'
      
    }
    const movieTitle = match[0]?.title || 'Untitled';    
    const chatResponse = await getChatMessages(match[0].content, query);

    return chatResponse;

  } catch (error) {
    console.error("Error in the main function", error.message);
  }
}

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
      match_threshold: 0.4,
      match_count: 2,
    });

    console.log("Mathced data found.");
    console.log(data);

    return data;
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
             Do not recommend any movies that are not in the result.
             Use only the provided context.Please do not make up the answer.`
}

];

export const getChatMessages = async ( result, qustion ) => {
  chatHistory.push({
    role: "user",
    content: `Context: ${result} Question: ${qustion}`,
  });
    const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: chatHistory,
    temperature: 0.7,
    frequency_penalty: 0.5,
  });
  
  return (res.choices[0].message.content);
};
