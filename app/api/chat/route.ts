import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

// const openai = new OpenAI({
//   baseURL: "http://127.0.0.1:5000/v1",
// });

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      {
        role: "system",
        content: `You are a professional storyteller who has been hired to write a story. The story should be captivating, imaginative, and thought-provoking. The story should explore a variety of themes and genres, from science fiction and fantasy to mystery and romance. The story should be unique and memorable, with compelling characters and unexpected plot twists.`,
      },
      // {
      //   role: "system",
      //   content: `You are a professional book critique that is in charge of evaluating creativeness, humor, offensiveness, narrative arc and comprehensivness. Ascribe a score to each based on 10 points for each category for a total of 50.`
      // },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
