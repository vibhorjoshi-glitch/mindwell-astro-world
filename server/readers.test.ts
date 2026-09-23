import { describe, expect, it } from "vitest";
import { READING_TYPES, TAROT_READERS } from "../shared/readers";

describe("Arcana reader catalog", () => {
  it("contains ten distinct human reader profiles with portraits", () => {
    expect(TAROT_READERS).toHaveLength(10);
    expect(new Set(TAROT_READERS.map(reader => reader.id)).size).toBe(10);
    expect(TAROT_READERS.every(reader => reader.image.startsWith("/manus-storage/"))).toBe(true);
    expect(TAROT_READERS.every(reader => reader.specialties.length >= 3)).toBe(true);
  });

  it("includes career, trader, and finance reading modes", () => {
    expect(READING_TYPES.map(type => type.id)).toEqual(
      expect.arrayContaining(["career", "trader", "finance"]),
    );
  });
});
