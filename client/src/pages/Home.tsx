import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { READING_TYPES, TAROT_READERS, type ReadingType } from "@shared/readers";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Gem,
  History,
  LogOut,
  Menu,
  Moon,
  Plus,
  Sparkles,
  Star,
  Sun,
  X,
} from "lucide-react";

type DrawnCard = {
  name: string;
  essence: string;
  position: string;
  reversed: boolean;
};

type ReadingResult = {
  title: string;
  readerName?: string;
  overview: string;
  cards: Array<{ name: string; position: string; meaning?: string; interpretation: string }>;
  reflection: string;
  nextStep: string;
  id?: number;
  question?: string;
};

const featuredCards: DrawnCard[] = [
  { name: "The Star", essence: "hope, healing, renewed trust", position: "A quiet signal", reversed: false },
  { name: "The Moon", essence: "dreams, uncertainty, inner signals", position: "The unseen", reversed: true },
  { name: "The Sun", essence: "clarity, joy, vitality", position: "What is opening", reversed: false },
];

function initials(name?: string | null) {
  return (name || "Seeker").split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();
}

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<"single" | "three-card">("three-card");
  const [selectedReader, setSelectedReader] = useState("mara");
  const [readingType, setReadingType] = useState<ReadingType>("general");
  const [reading, setReading] = useState<ReadingResult | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const historyQuery = trpc.tarot.history.useQuery(undefined, { enabled: isAuthenticated });
  const drawReading = trpc.tarot.drawReading.useMutation({
    onSuccess: (result) => {
      setReading(result.reading);
      historyQuery.refetch();
      toast.success("Your reading is ready.");
    },
    onError: (error) => toast.error(error.message || "The cards are quiet right now. Try again."),
  });

  const parsedHistory = useMemo(() => (historyQuery.data || []).map(item => {
    try {
      const parsed = JSON.parse(item.reading) as ReadingResult;
      return { ...item, parsed };
    } catch {
      return { ...item, parsed: null };
    }
  }), [historyQuery.data]);

  const submitQuestion = () => {
    const trimmed = question.trim();
    if (!trimmed) {
      toast.error("Ask the cards a question first.");
      return;
    }
    if (!isAuthenticated) {
      toast("Sign in to receive and save your AI reading.", { action: { label: "Sign in", onClick: startLogin } });
      return;
    }
    drawReading.mutate({ question: trimmed, spread, readerId: selectedReader, readingType });
  };

  const resetReading = () => {
    setReading(null);
    setQuestion("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className="min-h-screen bg-[#100e1b] grid place-items-center text-[#c9b7e5]"><Sparkles className="h-5 w-5 animate-pulse" /></div>;
  }

  return (
    <main className="tarot-app min-h-screen bg-[#100e1b] text-[#f7f1e8]">
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#100e1b]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3"><button onClick={() => setMobileMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/70 lg:hidden" aria-label="Open navigation"><Menu className="h-4 w-4" /></button><a href="#top" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-[#c6a6e8]/25 bg-[#c6a6e8]/10"><Gem className="h-4 w-4 text-[#d7baf5]" /></span><span className="font-display text-[21px] tracking-[-0.03em]">Arcana<span className="text-[#df9c70]">.</span></span></a></div>
          <div className="hidden items-center gap-8 text-[12px] font-medium text-white/45 md:flex"><a href="#reading" className="transition hover:text-white">New reading</a><a href="#history" className="transition hover:text-white">Your archive</a><a href="#about" className="transition hover:text-white">How it works</a></div>
          <div className="flex items-center gap-3"><span className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/35 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#7dd0a5]" /> {isAuthenticated ? "Private session" : "Guest preview"}</span>{isAuthenticated ? <div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#d7c4ed] text-[11px] font-bold text-[#251b36]">{initials(user?.name)}</span><button onClick={() => logout()} className="hidden text-white/45 transition hover:text-white sm:block" aria-label="Sign out"><LogOut className="h-4 w-4" /></button></div> : <button onClick={startLogin} className="rounded-full border border-[#c6a6e8]/30 bg-[#c6a6e8]/10 px-4 py-2 text-[12px] font-semibold text-[#e6d6f5] transition hover:bg-[#c6a6e8]/20">Sign in</button>}</div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1480px]">
        <aside className={`${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-[280px] border-r border-white/[0.08] bg-[#171326] p-5 transition-transform duration-300 lg:sticky lg:top-[73px] lg:block lg:h-[calc(100vh-73px)] lg:w-[252px] lg:shrink-0 lg:translate-x-0 lg:bg-transparent lg:p-6`}>
          <div className="mb-8 flex items-center justify-between lg:hidden"><span className="font-display text-xl">Arcana.</span><button onClick={() => setMobileMenuOpen(false)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10"><X className="h-4 w-4" /></button></div>
          <div className="mb-8 rounded-2xl border border-[#c6a6e8]/15 bg-[#c6a6e8]/[0.07] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d0b6ee]">The daily draw</p><p className="mt-2 font-display text-[22px] leading-[1.05]">One honest question is enough.</p><p className="mt-3 text-[12px] leading-5 text-white/40">Let the cards mirror what you already know.</p><button onClick={resetReading} className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#d8baf1] px-3 py-2.5 text-[11px] font-bold text-[#21172f] transition hover:bg-[#ead8fb]"><span>New reading</span><Plus className="h-3.5 w-3.5" /></button></div>
          <nav className="space-y-1"><a href="#reading" onClick={() => setMobileMenuOpen(false)} className="sidebar-link active"><Sparkles className="h-4 w-4" />Ask the cards</a><a href="#history" onClick={() => setMobileMenuOpen(false)} className="sidebar-link"><History className="h-4 w-4" />Reading archive<span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px]">{parsedHistory.length}</span></a><a href="#about" onClick={() => setMobileMenuOpen(false)} className="sidebar-link"><BookOpen className="h-4 w-4" />Arcana guide</a></nav>
          <div className="absolute bottom-7 left-6 right-6 hidden border-t border-white/[0.08] pt-5 lg:block"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-[10px] font-bold">{initials(user?.name)}</span><div className="min-w-0"><p className="truncate text-[12px] font-semibold text-white/75">{user?.name || "Guest seeker"}</p><p className="mt-0.5 truncate text-[10px] text-white/35">{user?.email || "Sign in to save readings"}</p></div></div></div>
        </aside>
        {mobileMenuOpen && <button className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation overlay" />}

        <div className="min-w-0 flex-1 px-5 pb-20 pt-8 lg:px-10 lg:pt-12">
          <section id="top" className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d89a72]">{isAuthenticated ? `Welcome back${user?.name ? `, ${user.name.split(" ")[0]}` : ""}` : "A reflective AI tarot studio"}</p><h1 className="mt-3 max-w-3xl font-display text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.9] tracking-[-0.075em] text-[#f6efe6]">What wants to be <em className="text-[#d8b5f0]">seen?</em></h1></div><div className="hidden max-w-[210px] text-right text-[12px] leading-5 text-white/35 sm:block"><p>Tarot is a prompt for reflection, not a fixed prediction.</p></div></section>

          <section id="readers" className="mb-10">
            <div className="flex items-end justify-between gap-4"><div><p className="eyebrow"><Sparkles className="h-3.5 w-3.5 text-[#d99a72]" /> Choose your reader</p><h2 className="mt-3 font-display text-[34px] tracking-[-0.06em]">Ten voices. One question.</h2></div><p className="hidden max-w-xs text-right text-[12px] leading-5 text-white/35 sm:block">Every reader has a distinct point of view, tone, and specialty.</p></div>
            <div className="reader-rail mt-5 grid grid-flow-col auto-cols-[190px] gap-3 overflow-x-auto pb-3">
              {TAROT_READERS.map(reader => <button key={reader.id} onClick={() => setSelectedReader(reader.id)} className={`reader-card ${selectedReader === reader.id ? "selected" : ""}`} style={{ "--reader-accent": reader.accent } as React.CSSProperties}><img src={reader.image} alt={`${reader.name}, ${reader.title}`} /><span className="reader-card-shade" /><span className="reader-card-copy"><strong>{reader.name}</strong><small>{reader.title}</small></span><span className="reader-check">{selectedReader === reader.id ? "✓" : ""}</span></button>)}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">{READING_TYPES.map(type => <button key={type.id} onClick={() => setReadingType(type.id)} className={`mode-pill ${readingType === type.id ? "selected" : ""}`}><span>{type.label}</span><small>{type.description}</small></button>)}</div>
          </section>

          <section id="reading" className="reading-grid grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)]">
            <div className="question-panel relative overflow-hidden rounded-[28px] border border-white/10 bg-[#19152b] p-6 sm:p-8"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#c8a5ea]/10" /><div className="absolute -right-7 top-0 h-40 w-40 rounded-full border border-[#c8a5ea]/10" /><div className="relative"><div className="flex items-center justify-between"><span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-[#df9c70]" /> Your question</span><span className="text-[10px] uppercase tracking-[0.16em] text-white/25">{question.length}/500</span></div><textarea value={question} onChange={(event) => setQuestion(event.target.value.slice(0, 500))} placeholder="What are you ready to understand?" className="mt-7 min-h-[150px] w-full resize-none border-0 bg-transparent font-display text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.06em] text-white outline-none placeholder:text-white/20" aria-label="Your tarot question" /><div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5"><div className="flex items-center gap-2"><button onClick={() => setSpread("single")} className={`spread-pill ${spread === "single" ? "selected" : ""}`}>Single card</button><button onClick={() => setSpread("three-card")} className={`spread-pill ${spread === "three-card" ? "selected" : ""}`}>Three card</button></div><button onClick={submitQuestion} disabled={drawReading.isPending} className="group flex items-center gap-3 rounded-full bg-[#dbb9f1] px-5 py-3 text-[12px] font-bold text-[#24172f] shadow-[0_12px_30px_rgba(201,163,235,.12)] transition hover:-translate-y-0.5 hover:bg-[#ecd6fb] disabled:cursor-wait disabled:opacity-60">{drawReading.isPending ? "Reading the cards…" : isAuthenticated ? "Reveal my reading" : "Sign in to reveal"}<span className="grid h-6 w-6 place-items-center rounded-full bg-[#24172f]/10"><ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span></button></div></div></div>
            <div className="deck-stage relative min-h-[390px] overflow-hidden rounded-[28px] border border-white/10 bg-[#211a36] p-6 sm:p-8"><div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(221,186,246,.18)_0_1px,transparent_1px),radial-gradient(circle_at_80%_60%,rgba(221,186,246,.12)_0_1px,transparent_1px)] [background-size:32px_32px,48px_48px]" /><div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="eyebrow"><Moon className="h-3.5 w-3.5 text-[#ddb6f5]" /> The deck is listening</span><span className="text-[10px] uppercase tracking-[0.16em] text-white/25">{spread === "single" ? "01 card" : "03 cards"}</span></div><div className="relative mx-auto h-[222px] w-[330px] sm:h-[245px] sm:w-[365px]">{featuredCards.map((card, index) => <div key={card.name} className={`tarot-card card-${index} ${card.reversed ? "reversed" : ""}`}><div className="tarot-card-inner"><div className="card-corner">✦</div><div className="card-sigil"><Star className="h-7 w-7" /><span>{card.name === "The Star" ? "XVII" : card.name === "The Moon" ? "XVIII" : "XIX"}</span></div><div className="card-name">{card.name}</div></div></div>)}</div><p className="relative mx-auto max-w-[280px] text-center text-[12px] leading-5 text-white/35">Ask a clear question, then choose the spread that matches your moment.</p></div></div>
          </section>

          {reading && <section className="reading-result mt-5 rounded-[28px] border border-[#d7b7ef]/20 bg-[#201933] p-6 sm:p-9"><div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-start"><div><span className="eyebrow"><Sparkles className="h-3.5 w-3.5 text-[#e3a275]" /> Your AI interpretation</span><h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.92] tracking-[-0.07em]">{reading.title}</h2><p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/55">{reading.overview}</p>{reading.readerName && <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#d9b3ef]">Read by {reading.readerName}</p>}</div><button onClick={resetReading} className="flex items-center gap-2 self-start rounded-full border border-white/10 px-3.5 py-2 text-[11px] font-semibold text-white/55 transition hover:border-white/20 hover:text-white"><Plus className="h-3.5 w-3.5" /> New question</button></div><div className="mt-7 grid gap-3 md:grid-cols-3">{reading.cards.map((card) => <article key={`${card.name}-${card.position}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d99a72]">{card.position}</p><h3 className="mt-3 font-display text-[25px] tracking-[-0.04em] text-[#e4c9f5]">{card.name}</h3><p className="mt-3 text-[13px] leading-6 text-white/50"><span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">Card meaning</span>{card.meaning && <span className="mb-2 block text-[12px] leading-5 text-[#d9c8e7]">{card.meaning}</span>}{card.interpretation}</p></article>)}</div><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="rounded-2xl bg-[#d6b9ef] p-5 text-[#261832]"><p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">Sit with this</p><p className="mt-3 font-display text-[25px] leading-[1.05] tracking-[-0.04em]">{reading.reflection}</p></div><div className="rounded-2xl bg-[#df9c70] p-5 text-[#2b1820]"><p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-65">Your next small step</p><p className="mt-3 font-display text-[25px] leading-[1.05] tracking-[-0.04em]">{reading.nextStep}</p></div></div></section>}

          <section id="history" className="mt-20"><div className="flex items-end justify-between"><div><p className="eyebrow"><History className="h-3.5 w-3.5 text-[#d99a72]" /> Your archive</p><h2 className="mt-3 font-display text-[38px] tracking-[-0.06em]">Past readings</h2></div><span className="text-[11px] text-white/30">Private to you</span></div>{!isAuthenticated ? <div className="empty-state mt-5"><LockIcon /><p className="mt-4 font-display text-[25px]">Your archive begins after sign in.</p><p className="mt-2 max-w-sm text-[13px] leading-6 text-white/40">Save readings, return to old questions, and notice the patterns over time.</p><button onClick={startLogin} className="mt-5 rounded-full border border-[#c6a6e8]/25 px-4 py-2 text-[12px] font-semibold text-[#ddc5f4] transition hover:bg-[#c6a6e8]/10">Sign in to save readings</button></div> : parsedHistory.length === 0 ? <div className="empty-state mt-5"><BookOpen className="h-5 w-5 text-[#d7baf5]" /><p className="mt-4 font-display text-[25px]">No readings yet.</p><p className="mt-2 text-[13px] text-white/40">Your questions and interpretations will appear here.</p></div> : <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{parsedHistory.map(item => <button key={item.id} onClick={() => item.parsed && setReading({ ...item.parsed, question: item.question })} className="history-card text-left"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d99a72]">{item.spread.startsWith("single") ? "Single card" : "Three card"}</span><ChevronRight className="h-4 w-4 text-white/25" /></div><p className="mt-4 line-clamp-2 font-display text-[23px] leading-[1.05] tracking-[-0.04em]">{item.question}</p><p className="mt-5 flex items-center gap-2 text-[11px] text-white/35"><Clock3 className="h-3.5 w-3.5" />{new Date(item.createdAt).toLocaleDateString()}</p></button>)}</div>}</section>

          <section id="about" className="mt-20 grid gap-5 border-t border-white/10 pt-10 md:grid-cols-3"><div><p className="eyebrow"><Sun className="h-3.5 w-3.5 text-[#e3a275]" /> Built for reflection</p><p className="mt-3 text-[13px] leading-6 text-white/40">Arcana uses AI to turn a symbolic card draw into a thoughtful prompt for your real life.</p></div><div><p className="eyebrow"><Gem className="h-3.5 w-3.5 text-[#d7baf5]" /> Your cards, your meaning</p><p className="mt-3 text-[13px] leading-6 text-white/40">The reading offers possibilities, not prescriptions. You decide what resonates.</p></div><div><p className="eyebrow"><Moon className="h-3.5 w-3.5 text-[#d7baf5]" /> Private by default</p><p className="mt-3 text-[13px] leading-6 text-white/40">Saved readings belong to your account and are never shown publicly.</p></div></section>
          <footer className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between"><span>Arcana — a reflective AI tarot studio</span><span>For reflection, not certainty.</span></footer>
        </div>
      </div>
    </main>
  );
}

function LockIcon() {
  return <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]"><Moon className="h-4 w-4 text-[#c7a9e6]" /></span>;
}
