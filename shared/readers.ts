export type ReadingType = "general" | "career" | "trader" | "finance" | "love" | "decision";

export type TarotReader = {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  accent: string;
};

export const READING_TYPES: Array<{ id: ReadingType; label: string; description: string }> = [
  { id: "general", label: "Open guidance", description: "A broad look at the energy around you" },
  { id: "career", label: "Career path", description: "Work, momentum, and your next move" },
  { id: "trader", label: "Trader's lens", description: "Mindset, discipline, and decision patterns" },
  { id: "finance", label: "Finance clarity", description: "Your relationship with risk, value, and resources" },
  { id: "love", label: "Love & connection", description: "Relationships, boundaries, and emotional truth" },
  { id: "decision", label: "A decision", description: "See the tension and choose with intention" },
];

export const TAROT_READERS: TarotReader[] = [
  { id: "mara", name: "Mara Vale", title: "The Intuitive Guide", bio: "Warm, direct, and deeply attuned to the feeling beneath the question.", specialties: ["Love", "Transitions", "Self-trust"], image: "/manus-storage/reader-mara_d12d0068.png", accent: "#d79a75" },
  { id: "luca", name: "Luca North", title: "The Pattern Reader", bio: "A calm analytical voice for spotting cycles, leverage, and the story behind a choice.", specialties: ["Career", "Decisions", "Patterns"], image: "/manus-storage/reader-luca_929f562b.png", accent: "#b99bdd" },
  { id: "sage", name: "Sage Rowan", title: "The Grounded Mystic", bio: "Gentle, practical, and here to turn symbolism into one doable next step.", specialties: ["Healing", "Boundaries", "Daily life"], image: "/manus-storage/reader-sage_61ffcf66.png", accent: "#9ec8ad" },
  { id: "naomi", name: "Naomi Sol", title: "The Truth Teller", bio: "Compassionate clarity for the questions you have been circling around.", specialties: ["Courage", "Relationships", "Change"], image: "/manus-storage/reader-naomi_f147e6f6.png", accent: "#e19a70" },
  { id: "elias", name: "Elias Gray", title: "The Scholar", bio: "Measured and reflective, with a gift for making the complex feel legible.", specialties: ["Career", "Finance", "Long view"], image: "/manus-storage/reader-elias_5e04e097.png", accent: "#9bb6d5" },
  { id: "iris", name: "Iris Bloom", title: "The Hope Keeper", bio: "Optimistic without being vague, helping you find the opening in a stuck moment.", specialties: ["New starts", "Love", "Confidence"], image: "/manus-storage/reader-iris_b5710661.png", accent: "#d6b5e8" },
  { id: "cedric", name: "Cedric Ash", title: "The Strategist", bio: "A grounded reader for risk, restraint, ambition, and the choices between them.", specialties: ["Trading", "Money", "Discipline"], image: "/manus-storage/reader-cedric_1632acd3.png", accent: "#9fc0a0" },
  { id: "yuki", name: "Yuki Sato", title: "The Still Point", bio: "Quiet, precise insight for returning to your center before you act.", specialties: ["Decisions", "Focus", "Balance"], image: "/manus-storage/reader-yuki_28590fe4.png", accent: "#d98b85" },
  { id: "theo", name: "Theo Marlowe", title: "The Elder Arcana", bio: "A wise, patient perspective on seasons, consequences, and what ripens in time.", specialties: ["Life chapters", "Career", "Legacy"], image: "/manus-storage/reader-theo_a14b01e8.png", accent: "#d2a375" },
  { id: "amara", name: "Amara Reyes", title: "The Fire Reader", bio: "Lively and empathetic, bringing energy to brave choices and honest desire.", specialties: ["Ambition", "Love", "Creative work"], image: "/manus-storage/reader-amara_eebd12e2.png", accent: "#7599d0" },
];
