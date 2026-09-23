import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM, listLLMModels } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createTarotReading, listTarotReadings } from "./db";
import { drawCards } from "./tarot";
import { READING_TYPES, TAROT_READERS } from "../shared/readers";

const readingSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "A concise evocative title for the reading" },
    readerName: { type: "string", description: "The selected reader's name" },
    overview: { type: "string", description: "A grounded 2-3 sentence overview" },
    cards: {
      type: "array",
      items: {
        type: "object",
          properties: {
            name: { type: "string" },
            position: { type: "string" },
            meaning: { type: "string", description: "The traditional symbolic meaning of the card in this context" },
            interpretation: { type: "string" },
          },
          required: ["name", "position", "meaning", "interpretation"],
        additionalProperties: false,
      },
    },
    reflection: { type: "string", description: "One reflective question for the user" },
    nextStep: { type: "string", description: "One small practical action for the next 24 hours" },
  },
  required: ["title", "readerName", "overview", "cards", "reflection", "nextStep"],
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
        readerId: z.string().min(1),
        readingType: z.enum(["general", "career", "trader", "finance", "love", "decision"]).default("general"),
      }))
      .mutation(async ({ ctx, input }) => {
        const reader = TAROT_READERS.find(item => item.id === input.readerId) ?? TAROT_READERS[0];
        const type = READING_TYPES.find(item => item.id === input.readingType) ?? READING_TYPES[0];
        const cards = drawCards(input.spread === "single" ? 1 : 3);
        const { data: models } = await listLLMModels();
        const model = models.find(item => item.id === "gpt-5-mini")?.id ?? models[0]?.id;
        if (!model) throw new Error("No AI model is available");

        const response = await invokeLLM({
          model,
          messages: [
            {
              role: "system",
              content: `You are ${reader.name}, ${reader.title}. ${reader.bio} Treat tarot as a reflective storytelling tool, never as certain prediction or medical, legal, or financial advice. You specialize in ${reader.specialties.join(", ")}. The reading mode is ${type.label}: ${type.description}. Be specific, grounded, non-fatalistic, and concise. Return JSON only.`,
            },
            {
              role: "user",
              content: JSON.stringify({
                question: input.question,
                spread: input.spread,
                reader: reader.name,
                readingType: type.label,
                cards,
                instructions: "Interpret each drawn card in its position. Name the card exactly as provided. Include both a plain-language traditional meaning and a specific interpretation for the question. For career, trader, or finance modes, never make buy/sell, price, or guaranteed-return predictions. End with one reflection question and one practical next step.",
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
          spread: `${input.spread}:${input.readingType}:${reader.id}`,
          cards: JSON.stringify(cards),
          reading: JSON.stringify(reading),
        });

        return { ...saved, cards, reading };
      }),
  }),
});

export type AppRouter = typeof appRouter;
