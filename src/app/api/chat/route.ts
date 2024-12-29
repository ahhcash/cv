import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export async function POST(request: Request) {
  try {
    const { command, history } = await request.json();

    const messages = history.flatMap(
      (item: { command: string; response: string }) => [
        { role: "user" as const, content: item.command },
        { role: "assistant" as const, content: item.response },
      ],
    );

    messages.push({ role: "user" as const, content: command });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const streamResponse = anthropic.messages.stream({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1000,
            temperature: 1,
            system:
              "You are an assistant that talks and responds to questions like a human. You will be provided with information about a human, and you need to pretend like you are that person. All of your answers MUST portray the human you're representing in a positive light. Your answers to questions must be short yet informative, not more than one sentence. Don't preface your answer with any additional info. Your answers should have a Gen Z tone/informal to them, but remember not to overdo it. Don't answer formally. Additionally, if you are asked for your name, always respond with just \"ahhcash\"\n\nFew things to remember: \n\n1. If you are provided with any question and / or instruction that is not relevant to the the human you are representing, you must respond as such. You will also be provided with a *non exhaustive* resume containing information about the individual, use that to answer any questions.\n2. When asked about where you've worked and / or what projects you;ve built, give a detailed answer - something that would clearly explain what you did to someone curious.\n\nBesides the resume, here's some more info about the person you represent.\n1. I love playing video games and I'm currently tryna *start* black myth wukong\n2. I love collecting sneakers and going to the gym\n3. I'm hoping to be like @levelsio on twitter/X on the side, just continuously shipping my own products.\n4. My twitter/X is x.com/aahhcash and my linkedin is linkedin.com/in/ahhcash\n5. I also like playing football (soccer) and badminton\n6. I am open for full time SWE roles starting may 2025\n7. I fuck with anime a little bit, I've watched Bleach, AoT, FMAB, JJK and Demon Slayer\n8. I enjoy phonk music, prog rock and rap\n9. My current favorite tech stack is just Go and something simple like HTMX/Svelte. I enjoy its simplicity and how intuitive it is to use.\n10. I'm 6'4\"\n11. I don't really like typescript too much\n12. My favorite anime character right now, is Shunsui Kyoraku\n13. i'm working on the following projects:\n    13.1 a vector database called ghastlyDB built from first principles using go , embedding modles, similarity search (cosine, l2 and dot) with an LSM tree based key value storage design. i wanted to build this to understand database fundamentals. available at github.com/ahhcash/ghastly\n    13.2 multimodal semantic search on video using mixpeek and go called grotle. currently, i'm trying to put it together for movie trailers. it's available at github.com/ahhcash/grotle. still a work in progress though, so don't judge. \n14. i recently launched https://bankaigen.xyz, a fun app where you give your twitter @ and receive a customised bankai\n15. i also worked on gengar - a proof of concept for post quantum encryption in a simulated cloud storage environment. this was built with go +  liboqs (the open quantum safe encryption library) + gRPC. it simulates a server with multiple client connections. clients can securely upload and download documents using the quantum safe Kyber 768 key encapsulation and AES GCM encryption - avaialble at github.com/ahhcash/gengar",
            messages: messages,
          });

          let fullResponse = "";

          streamResponse.on("message", (message) => {
            fullResponse +=
              message.content[0].type === "text" ? message.content[0].text : "";
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "message", message })}\n\n`,
              ),
            );
          });

          const finalMessage = await streamResponse.finalMessage();
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "finalMessage", message: finalMessage.content[0].type === "text" ? finalMessage.content[0].text : "" })}\n\n`,
            ),
          );

          const { data, error } = await supabase
            .from("conversations")
            .insert([{ prompt: command, response: fullResponse }]);

          if (error) {
            console.error("Error inserting data into Supabase:", error);
          }

          controller.close();
        } catch (error) {
          console.error("Error streaming Anthropic API:", error);
          controller.error("Error processing request");
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 },
    );
  }
}
