export const CARD_CATALOG = [
  ["The Fool", "beginnings, trust, a leap into the unknown"],
  ["The Magician", "agency, skill, focused manifestation"],
  ["The High Priestess", "intuition, mystery, inner knowing"],
  ["The Empress", "creative abundance, nurture, sensuality"],
  ["The Emperor", "structure, authority, stable foundations"],
  ["The Hierophant", "tradition, mentorship, shared wisdom"],
  ["The Lovers", "alignment, choice, values in relationship"],
  ["The Chariot", "willpower, direction, forward motion"],
  ["Strength", "courage, compassion, calm self-command"],
  ["The Hermit", "reflection, solitude, a guiding light"],
  ["Wheel of Fortune", "cycles, turning points, timing"],
  ["Justice", "truth, accountability, clear decisions"],
  ["The Hanged One", "surrender, perspective, a necessary pause"],
  ["Death", "release, transformation, a clean threshold"],
  ["Temperance", "balance, integration, patient alchemy"],
  ["The Devil", "attachment, shadow work, reclaimed choice"],
  ["The Tower", "disruption, revelation, freedom from false structures"],
  ["The Star", "hope, healing, renewed trust"],
  ["The Moon", "dreams, uncertainty, subconscious signals"],
  ["The Sun", "clarity, joy, confidence, vitality"],
  ["Judgement", "awakening, honest reckoning, a call forward"],
  ["The World", "completion, integration, a wider horizon"],
] as const;

const CARD_POSITIONS = ["What is present", "What is shifting", "What wants your attention"] as const;

export function drawCards(count: 1 | 3) {
  return [...CARD_CATALOG]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(([name, essence], index) => ({
      name,
      essence,
      position: count === 1 ? "Your card" : CARD_POSITIONS[index],
      reversed: Math.random() > 0.78,
    }));
}
