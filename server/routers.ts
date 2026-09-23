import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM, listLLMModels } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createTarotReading, listTarotReadings } from "./db";
import { drawCards } from "./tarot";

const readingSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "A concise evocative title for the reading" },
    overview: { type: "string", description: "A grounded 2-3 sentence overview" },
    cards: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          position: { type: "string" },
          interpretation: { type: "string" },
        },
        required: ["name", "position", "interpretation"],
        additionalProperties: false,
      },
    },
    reflection: { type: "string", description: "One reflective question for the user" },
    nextStep: { type: "string", description: "One small practical action for the next 24 hours" },
  },
  required: ["title", "overview", "cards", "reflection", "nextStep"],
  additionalProperties: false,
} as const;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  tarot: router({
    history: protectedProcedure.query(({ ctx }) => listTarotReadings(ctx.user.id)),
    drawReading: protectedProcedure
      .input(z.object({
        question: z.string().trim().min(3).max(500),
        spread: z.enum(["single", "three-card"]).default("three-card"),
      }))
      .mutation(async ({ ctx, input }) => {
        const cards = drawCards(input.spread === "single" ? 1 : 3);
        const { data: models } = await listLLMModels();
        const model = models.find(item => item.id === "gpt-5-mini")?.id ?? models[0]?.id;
        if (!model) throw new Error("No AI model is available");

        const response = await invokeLLM({
          model,
          messages: [
            {
              role: "system",
              content: "You are a warm, insightful tarot reader. Treat tarot as a reflective storytelling tool, never as certain prediction or medical, legal, or financial advice. Be specific to the user's question, grounded, non-fatalistic, and concise. Return JSON only.",
            },
            {
              role: "user",
              content: JSON.stringify({
                question: input.question,
                spread: input.spread,
                cards,
                instructions: "Interpret each drawn card in its position. Name the card exactly as provided. Avoid generic mystical filler. End with one reflection question and one practical next step.",
              }),
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "tarot_reading",
              strict: true,
              schema: readingSchema,
            },
          },
        });

        const raw = response.choices[0]?.message?.content;
        const content = typeof raw === "string" ? raw : "";
        if (!content) throw new Error("The AI returned an empty reading");

        const reading = JSON.parse(content) as {
          title: string;
          overview: string;
          cards: Array<{ name: string; position: string; interpretation: string }>;
          reflection: string;
          nextStep: string;
        };

        const saved = await createTarotReading({
          userId: ctx.user.id,
          question: input.question,
          spread: input.spread,
          cards: JSON.stringify(cards),
          reading: JSON.stringify(reading),
        });

        return { ...saved, cards, reading };
      }),
  }),
});

export type AppRouter = typeof appRouter;
