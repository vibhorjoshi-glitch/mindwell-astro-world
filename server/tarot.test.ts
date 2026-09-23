import { describe, expect, it } from "vitest";
import { CARD_CATALOG, drawCards } from "./tarot";

describe("tarot card drawer", () => {
  it("draws one unique card for a single-card spread", () => {
    const cards = drawCards(1);
    expect(cards).toHaveLength(1);
    expect(CARD_CATALOG.some(([name]) => name === cards[0]?.name)).toBe(true);
    expect(cards[0]?.position).toBe("Your card");
  });

  it("draws three unique cards with meaningful positions", () => {
    const cards = drawCards(3);
    expect(cards).toHaveLength(3);
    expect(new Set(cards.map(card => card.name)).size).toBe(3);
    expect(cards.map(card => card.position)).toEqual([
      "What is present",
      "What is shifting",
      "What wants your attention",
    ]);
    expect(cards.every(card => typeof card.essence === "string")).toBe(true);
  });
});
