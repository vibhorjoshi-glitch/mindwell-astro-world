import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  HeartPulse,
  LockKeyhole,
  Mail,
  Menu,
  Moon,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const benefits = [
  {
    icon: HeartPulse,
    eyebrow: "Notice",
    title: "Know what you need",
    body: "Simple check-ins turn your inner weather into a clearer next step.",
    tone: "peach",
  },
  {
    icon: Sparkles,
    eyebrow: "Nurture",
    title: "Build small rituals",
    body: "Gentle prompts and guided resets that fit into real, busy days.",
    tone: "lilac",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Grow",
    title: "Feel supported",
    body: "A private space to reflect, learn, and move forward at your own pace.",
    tone: "sage",
  },
];

const trustPoints = ["Private by design", "Backed by wellbeing experts", "Made for your pace"];

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Add your email and password to continue.");
      return;
    }
    toast.success("Welcome back. Your calm space is ready.");
  };

  const scrollToSignIn = () => {
    document.getElementById("sign-in")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#16121f] text-[#f7f0e7] selection:bg-[#dbc7ff] selection:text-[#17121f]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true">
        <div className="noise absolute inset-0" />
        <div className="glow glow-one absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#6b4f8a]/25 blur-3xl" />
        <div className="glow glow-two absolute -right-40 top-[35rem] h-[30rem] w-[30rem] rounded-full bg-[#e4a57e]/10 blur-3xl" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label="MindWell home">
          <span className="grid h-10 w-10 place-items-center rounded-[14px] border border-white/20 bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-200 group-hover:-rotate-6 group-hover:bg-white/15">
            <Moon className="h-[18px] w-[18px] text-[#f8d9a9]" strokeWidth={1.8} />
          </span>
          <span className="font-display text-[21px] tracking-[-0.03em] text-white">mindwell<span className="text-[#e7ba8c]">.</span></span>
        </a>
        <div className="hidden items-center gap-8 text-[13px] font-medium text-white/60 md:flex">
          <a className="transition hover:text-white" href="#why-mindwell">Why MindWell</a>
          <a className="transition hover:text-white" href="#rituals">Our approach</a>
          <a className="transition hover:text-white" href="#stories">Stories</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={scrollToSignIn} className="hidden rounded-full px-4 py-2 text-[13px] font-semibold text-white/75 transition hover:bg-white/10 hover:text-white sm:block">Sign in</button>
          <button onClick={scrollToSignIn} className="group flex items-center gap-2 rounded-full bg-[#f7f0e7] px-4 py-2.5 text-[13px] font-bold text-[#1d1726] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.97]">
            Begin your reset <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 md:hidden" aria-label="Open menu" onClick={() => toast("Use the page anchors to explore MindWell.")}>
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center lg:gap-20 lg:px-10 lg:pb-28 lg:pt-20">
        <div className="hero-copy max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#f4d9b6]/20 bg-[#f4d9b6]/[0.07] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#f2cda5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e9a77a] shadow-[0_0_12px_#e9a77a]" />
            A softer place to land
          </div>
          <h1 className="font-display max-w-[720px] text-[clamp(3.5rem,7.2vw,7.3rem)] font-medium leading-[0.91] tracking-[-0.075em] text-[#fbf5ed]">
            Make space for a <em className="text-[#deb689]">better</em> day.
          </h1>
          <p className="mt-8 max-w-lg text-[17px] leading-8 text-white/60 sm:text-[19px] sm:leading-9">
            MindWell is a thoughtful toolkit for checking in, finding your footing, and making everyday mental wellness feel a little more possible.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={scrollToSignIn} className="group flex items-center gap-3 rounded-full bg-[#e6b887] px-6 py-3.5 text-[14px] font-bold text-[#201726] shadow-[0_14px_40px_rgba(221,171,129,0.2)] transition duration-200 hover:-translate-y-1 hover:bg-[#f2c99d] active:scale-[0.97]">
              Start with a check-in
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#201726]/10 transition group-hover:translate-x-0.5"><ArrowRight className="h-3.5 w-3.5" /></span>
            </button>
            <button onClick={() => setIsResetOpen(true)} className="group flex items-center gap-2 px-2 py-3 text-[14px] font-semibold text-white/70 transition hover:text-white">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25 transition group-hover:border-[#e6b887] group-hover:bg-[#e6b887]/10"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
              Try a 2 min reset
            </button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
            {trustPoints.map((point) => <span key={point} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#b8cfad]" />{point}</span>)}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:justify-self-end">
          <div className="hero-orbit absolute -inset-8 rounded-[42%] border border-[#d8c5ff]/10" />
          <div className="hero-orbit hero-orbit-delayed absolute -inset-2 rounded-[38%] border border-[#e5b17d]/10" />
          <div className="relative aspect-[0.86] overflow-hidden rounded-[34px] border border-white/15 bg-gradient-to-br from-[#726096] via-[#443452] to-[#201a2c] shadow-[0_30px_100px_rgba(0,0,0,0.42)] sm:aspect-[1.02]">
            <img src="/manus-storage/mindwell-hero_a9b4398c.png" alt="Abstract moonlit landscape representing a calmer headspace" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(255,240,205,.3),transparent_13%),radial-gradient(circle_at_25%_75%,rgba(178,148,221,.22),transparent_28%),linear-gradient(140deg,rgba(255,255,255,.16),transparent_45%)]" />
            <div className="absolute -right-20 top-12 h-64 w-64 rounded-full border border-[#f7dfbd]/35 bg-[#f6d9b0]/20 shadow-[inset_0_0_50px_rgba(255,238,205,0.25),0_0_80px_rgba(238,183,123,0.28)] backdrop-blur-[1px]" />
            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10 bg-[#29263f]/45" />
            <div className="absolute left-[12%] top-[17%] h-2 w-2 rounded-full bg-[#f8e8c7] shadow-[0_0_16px_#f8e8c7]" />
            <div className="absolute left-[22%] top-[32%] h-1.5 w-1.5 rounded-full bg-[#f8e8c7]/80" />
            <div className="absolute right-[18%] top-[17%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_12px_white]" />
            <div className="absolute right-[36%] top-[11%] h-1 w-1 rounded-full bg-white/70" />
            <div className="absolute bottom-[22%] right-[21%] h-1.5 w-1.5 rounded-full bg-[#d9cbff] shadow-[0_0_12px_#d9cbff]" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between sm:bottom-9 sm:left-9 sm:right-9">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Today&apos;s invitation</p>
                <p className="max-w-[220px] font-display text-[30px] leading-[0.98] tracking-[-0.05em] text-white sm:text-[36px]">Notice what feels <em className="text-[#edc99e]">true.</em></p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"><Sparkles className="h-5 w-5 text-[#f5d2a4]" /></span>
            </div>
          </div>
          <div className="absolute -bottom-7 -left-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#2b2338]/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-10">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#b8cfad]/15"><Heart className="h-4 w-4 fill-[#b8cfad] text-[#b8cfad]" /></span>
            <div><p className="text-[10px] uppercase tracking-[0.14em] text-white/40">Mood check-in</p><p className="mt-0.5 text-[13px] font-semibold text-white/90">A moment for yourself</p></div>
          </div>
        </div>
      </section>

      <section id="why-mindwell" className="relative z-10 border-y border-white/[0.08] bg-[#eee7df] text-[#241b2b]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#946c5c]">A little more human</p>
            <h2 className="mt-4 max-w-md font-display text-[clamp(2.8rem,5vw,5.3rem)] leading-[0.95] tracking-[-0.065em]">Wellbeing is not a <em className="text-[#b47656]">checklist.</em></h2>
            <p className="mt-5 max-w-md text-[16px] leading-7 text-[#665b62]">It is the quiet practice of paying attention. MindWell meets you there—with less pressure, more context, and tools that feel good to return to.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, eyebrow, title, body, tone }) => (
              <article key={title} className={`benefit-card ${tone} rounded-[24px] p-5 sm:p-6`}>
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/60"><Icon className="h-[18px] w-[18px]" strokeWidth={1.8} /></span>
                <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.18em] opacity-60">{eyebrow}</p>
                <h3 className="mt-2 font-display text-[25px] leading-[1] tracking-[-0.04em]">{title}</h3>
                <p className="mt-3 text-[13px] leading-5 opacity-70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rituals" className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
        <div className="relative min-h-[350px] overflow-hidden rounded-[30px] border border-white/10 bg-[#241e31] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-10">
          <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#c4b1f0]/15" />
          <div className="absolute -right-10 -top-14 h-52 w-52 rounded-full border border-[#c4b1f0]/10" />
          <div className="relative flex h-full flex-col justify-between">
            <div><span className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#c8b4e9]">Your pace, your practice</span><h2 className="mt-5 max-w-md font-display text-[clamp(2.7rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.06em]">Tiny shifts can change the <em className="text-[#dcb384]">whole day.</em></h2></div>
            <div className="mt-16 flex items-end justify-between gap-5"><p className="max-w-[250px] text-[14px] leading-6 text-white/50">Choose a prompt, a practice, or a pause. There is no right way to feel better.</p><span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#e6b887] text-[#251a29]"><ArrowUpRight className="h-5 w-5" /></span></div>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c7b2e7]">The MindWell method</p>
          <div className="mt-7 divide-y divide-white/10">
            {[
              ["01", "Check in", "Name the feeling without needing to fix it."],
              ["02", "Make room", "Use a short, guided practice to soften the edges."],
              ["03", "Move gently", "Leave with one small, kind next step."],
            ].map(([number, title, body]) => <div key={number} className="flex gap-5 py-5 first:pt-0 last:pb-0"><span className="font-display text-[17px] text-[#e3b989]">{number}</span><div><h3 className="font-display text-[25px] tracking-[-0.04em]">{title}</h3><p className="mt-1 max-w-sm text-[14px] leading-6 text-white/45">{body}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="stories" className="relative z-10 bg-[#dbe4d5] text-[#273127]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.65fr_1.35fr] lg:items-center lg:px-10 lg:py-20">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#607462]">A note from the community</p><blockquote className="mt-5 font-display text-[clamp(2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.06em]">“I stopped waiting to feel ‘fixed’ and started feeling <em className="text-[#66806b]">present.</em>”</blockquote><p className="mt-6 text-[13px] font-semibold text-[#68766b]">— Maya, MindWell member</p></div>
          <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-[24px] bg-[#f2f0e8]/75 p-6"><p className="text-[13px] leading-6 text-[#58665a]">“The check-ins are just the right amount of structure. I can hear myself think again.”</p><p className="mt-8 text-[11px] font-bold uppercase tracking-[0.15em] text-[#7e8d80]">Product designer · 29</p></div><div className="rounded-[24px] bg-[#b7cab5]/60 p-6"><p className="text-[13px] leading-6 text-[#3f5945]">“It feels less like an app and more like a kind voice in my pocket.”</p><p className="mt-8 text-[11px] font-bold uppercase tracking-[0.15em] text-[#607462]">Teacher · 35</p></div></div>
        </div>
      </section>

      <section id="sign-in" className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.9fr_0.8fr] lg:items-center lg:px-10 lg:py-28">
        <div><span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#e6b887]/25 bg-[#e6b887]/10"><Moon className="h-5 w-5 text-[#e6b887]" /></span><h2 className="mt-7 max-w-lg font-display text-[clamp(2.8rem,5vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">Your calmer corner is <em className="text-[#e6b887]">waiting.</em></h2><p className="mt-6 max-w-md text-[16px] leading-7 text-white/55">Sign in to keep your reflections, continue a practice, and pick up exactly where you left off.</p><button onClick={() => toast("Counselor registration will be available soon.")} className="mt-8 flex items-center gap-2 text-[13px] font-semibold text-[#f0c998] transition hover:text-white">Are you a counselor? Register here <ArrowRight className="h-4 w-4" /></button></div>
        <div className="rounded-[28px] bg-[#f6f0e8] p-6 text-[#251d2a] shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:p-8">
          <div className="flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#9b7160]">Welcome back</p><h3 className="mt-2 font-display text-[32px] tracking-[-0.05em]">Good to see you.</h3></div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#e6b887]/20"><Heart className="h-4 w-4 fill-[#be795d] text-[#be795d]" /></span></div>
          <form className="mt-8 space-y-4" onSubmit={handleSignIn}>
            <label className="block"><span className="mb-2 block text-[12px] font-semibold text-[#71656b]">Email address</span><span className="relative block"><Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9e9295]" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" className="h-12 w-full rounded-2xl border border-[#dfd5cc] bg-white/75 pl-11 pr-4 text-[14px] outline-none transition placeholder:text-[#b2a7a9] focus:border-[#b78062] focus:ring-4 focus:ring-[#b78062]/10" /></span></label>
            <label className="block"><span className="mb-2 block text-[12px] font-semibold text-[#71656b]">Password</span><span className="relative block"><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9e9295]" /><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className="h-12 w-full rounded-2xl border border-[#dfd5cc] bg-white/75 pl-11 pr-12 text-[14px] outline-none transition placeholder:text-[#b2a7a9] focus:border-[#b78062] focus:ring-4 focus:ring-[#b78062]/10" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#9e9295] transition hover:bg-[#eee6dc] hover:text-[#604c52]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
            <div className="flex items-center justify-between pt-1 text-[12px]"><label className="flex items-center gap-2 text-[#776a70]"><input type="checkbox" className="h-4 w-4 accent-[#a96f57]" /> Remember me</label><button type="button" onClick={() => toast("Password reset link coming soon.")} className="font-semibold text-[#a36750] hover:underline">Forgot password?</button></div>
            <button type="submit" className="group mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#2a2030] text-[14px] font-bold text-[#fff9f1] shadow-[0_10px_24px_rgba(42,32,48,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#3a2b42] active:scale-[0.98]">Sign in <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button>
          </form>
          <p className="mt-6 text-center text-[12px] text-[#84777b]">New to MindWell? <button onClick={() => toast("Account creation will be available soon.")} className="font-bold text-[#a36750] hover:underline">Create an account</button></p>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10"><Moon className="h-3.5 w-3.5 text-[#e6b887]" /></span><span className="font-display text-[16px] text-white/75">mindwell<span className="text-[#e7ba8c]">.</span></span></div><p>© 2026 MindWell. A softer way forward.</p><div className="flex gap-5"><button onClick={() => toast("Privacy information coming soon.")} className="hover:text-white">Privacy</button><button onClick={() => toast("Terms information coming soon.")} className="hover:text-white">Terms</button></div></div></footer>

      {isResetOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-[#120e1a]/80 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="reset-title"><div className="relative w-full max-w-md rounded-[28px] border border-white/15 bg-[#2b2238] p-7 shadow-2xl sm:p-9"><button onClick={() => setIsResetOpen(false)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/15 hover:text-white" aria-label="Close reset"><X className="h-4 w-4" /></button><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e6b887]/15"><Sparkles className="h-5 w-5 text-[#e6b887]" /></span><p className="mt-7 text-[11px] font-bold uppercase tracking-[0.17em] text-[#e5be91]">Two minute reset</p><h2 id="reset-title" className="mt-3 font-display text-[38px] leading-[0.95] tracking-[-0.06em]">Come back to your breath.</h2><p className="mt-5 text-[14px] leading-6 text-white/55">Unclench your jaw. Drop your shoulders. Take one slow breath in, and an even slower breath out. You do not have to solve everything right now.</p><div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4"><span className="breath-dot h-3 w-3 rounded-full bg-[#d8c6ff] shadow-[0_0_16px_#d8c6ff]" /><p className="text-[13px] text-white/75">In for four · out for six</p></div><button onClick={() => setIsResetOpen(false)} className="mt-7 h-12 w-full rounded-2xl bg-[#f4d3a8] text-[13px] font-bold text-[#241a2c] transition hover:bg-[#ffe0ba] active:scale-[0.98]">I feel a little lighter</button></div></div>}
    </main>
  );
}
