import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Search, Menu, X, ArrowRight, Briefcase, GraduationCap, Users, MapPin, Clock,
  Bookmark, Building2, Star, Quote, ChevronLeft, ChevronRight, CheckCircle2,
  Compass, Send, Trophy, Facebook, Linkedin, Instagram, Twitter, MessageCircle,
} from "lucide-react";
import logoSrc from "@/assets/logo.png";
const logo = { url: logoSrc };
import processImgSrc from "@/assets/process.png";
const processImg = { url: processImgSrc };
import storiesImgSrc from "@/assets/stories.png";
const storiesImg = { url: storiesImgSrc };
import servicesImgSrc from "@/assets/services.png";
const servicesImg = { url: servicesImgSrc };
import aboutImgSrc from "@/assets/about.png";
const aboutImg = { url: aboutImgSrc };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jobs4U.sg — Find Jobs, Learn Skills & Grow Your Network in Singapore" },
      { name: "description", content: "Find a job, learn new skills, and expand your professional network in Singapore — all in one place with Jobs4U.sg." },
      { property: "og:title", content: "Jobs4U.sg — Your Career Starts Here" },
      { property: "og:description", content: "Connect with opportunities that fit you. Jobs, career insights and recruitment services in Singapore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WA = "https://wa.me/6593752892";

function Btn({ variant = "primary", children, href = "#", className = "", ...rest }: { variant?: "primary" | "outline" | "solid" | "light" | "ghostLight" | "wa"; children: ReactNode; href?: string; className?: string; target?: string; rel?: string }) {
  const v = {
    primary: "bg-accent text-accent-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5",
    solid: "bg-primary text-primary-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    light: "bg-primary-foreground text-primary hover:-translate-y-0.5",
    ghostLight: "border-2 border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10",
    wa: "bg-success text-success-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  }[variant];
  return (
    <a href={href} {...rest} className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${v} ${className}`}>
      {children}
    </a>
  );
}
const Arrow = () => <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />;

function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-lift">
      <img src={src} alt={alt} loading="lazy" className="h-auto w-full rounded-2xl object-contain" />
    </div>
  );
}

function SectionHead({ label, title, sub, center = true }: { label?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {label && <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{label}</p>}
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Jobs", "#jobs"], ["Articles", "#articles"], ["For Employers", "#services"], ["About Us", "#about"]];
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <a href="#" className="shrink-0"><img src={logo.url} alt="Jobs4U.sg" className="h-11 w-auto object-contain sm:h-12" /></a>
        <label className="relative hidden min-w-0 flex-1 md:block lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search jobs, skills, or articles..." className="w-full rounded-full border border-input bg-muted py-2.5 pl-9 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/30" />
        </label>
        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          {links.map(([l, h]) => <a key={l} href={h} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">{l}</a>)}
        </nav>
        <div className="ml-auto hidden lg:flex">
          <Btn variant="primary" href="#jobs" className="px-5">Explore Jobs</Btn>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full text-primary hover:bg-secondary md:ml-0 lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className="px-4 pb-3 md:hidden">
        <label className="relative block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search jobs, skills, or articles..." className="w-full rounded-full border border-input bg-muted py-2.5 pl-9 pr-4 text-sm outline-none focus:border-accent" />
        </label>
      </div>
      {open && (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <nav className="flex flex-col">
            {links.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium hover:bg-secondary">{l}</a>)}
          </nav>
          <Btn variant="primary" href="#jobs" className="mt-3 w-full">Explore Jobs</Btn>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/10" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-success/10" />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
        <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-6xl lg:text-7xl">
          Connect with opportunities that <span className="text-accent">fit you.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">Find a job, learn new skills, and expand your professional network — all in one place.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Btn variant="primary" href="#jobs" className="px-8">Explore Jobs <Arrow /></Btn>
          <Btn variant="outline" href="#articles" className="px-8">Read Career Insights</Btn>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-foreground/70">
          {["Free for job seekers", "Singapore-focused", "Trusted employers"].map(t => (
            <span key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { i: Briefcase, k: "Find a Job", t: "Find a Job", d: "Explore job opportunities across various industries.", cta: "Explore Jobs", href: "#jobs",
      bg: "from-primary/10 via-card to-card", glow: "bg-primary/15", txt: "text-primary", icon: "bg-primary text-primary-foreground", hb: "hover:border-primary/50", btn: "group-hover:bg-primary" },
    { i: GraduationCap, k: "Learn & Grow", t: "Learn a New Skill", d: "Access articles, tips, and resources to grow your career.", cta: "Explore Articles", href: "#articles",
      bg: "from-accent/15 via-card to-card", glow: "bg-accent/20", txt: "text-accent", icon: "bg-accent text-accent-foreground", hb: "hover:border-accent/60", btn: "group-hover:bg-accent" },
    { i: Users, k: "Connect", t: "Expand Your Network", d: "Connect with professionals and employers.", cta: "Start Networking", href: "#",
      bg: "from-success/15 via-card to-card", glow: "bg-success/20", txt: "text-success", icon: "bg-success text-success-foreground", hb: "hover:border-success/60", btn: "group-hover:bg-success" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ i: I, k, t, d, cta, href, bg, glow, txt, icon, hb, btn }, idx) => (
          <a key={t} href={href} className={`group relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] border border-border bg-gradient-to-br ${bg} p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8 ${hb} ${idx === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}>
            <div className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full ${glow} opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
            <div className={`pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full border-2 border-current opacity-10 ${txt}`} />
            <div className={`pointer-events-none absolute right-24 top-6 h-3 w-3 rounded-full opacity-30 ${icon}`} />
            <I strokeWidth={1.25} className={`pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 opacity-[0.08] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-44 sm:w-44 ${txt}`} />

            <div className="relative flex justify-end">
              <div className={`grid h-16 w-16 place-items-center rounded-2xl shadow-lift transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${icon}`}>
                <I className="h-8 w-8" />
              </div>
            </div>

            <div className="relative mt-auto pt-8 pr-12">
              <p className={`text-xs font-bold uppercase tracking-[0.18em] ${txt}`}>{k}</p>
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-[1.7rem]">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
              <span className={`mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold ${txt}`}>
                {cta} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
            <span className={`absolute bottom-7 right-7 grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-primary transition-colors duration-300 group-hover:border-transparent group-hover:text-primary-foreground sm:bottom-8 sm:right-8 ${btn}`}>
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}


function HowItWorks() {
  const steps = [
    { n: "01", i: Search, t: "Tell Us What You Need", d: "Start by searching for a role, skill, or topic that interests you." },
    { n: "02", i: Compass, t: "Search & Explore", d: "Find jobs, read articles, and discover opportunities." },
    { n: "03", i: Send, t: "Apply or Connect", d: "Apply directly or connect with employers." },
    { n: "04", i: Trophy, t: "Achieve Your Goals", d: "Get hired, learn new skills, and grow your career." },
  ];
  return (
    <section className="bg-secondary/60 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHead center={false} label="Step by step" title="How Jobs4U.sg Works" sub="A simple and fast process to help you reach your career goals." />
          <ol className="mt-8 space-y-4">
            {steps.map(({ n, i: I, t, d }) => (
              <li key={n} className="flex gap-4 rounded-2xl bg-card p-5 shadow-soft transition-transform hover:translate-x-1">
                <span className="text-2xl font-extrabold text-accent">{n}</span>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 font-bold text-primary"><I className="h-4 w-4 shrink-0" />{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Img src={processImg.url} alt="How Jobs4U.sg works — step-by-step process" />
      </div>
    </section>
  );
}

function Jobs() {
  const jobs: { t: string; c: string; l: string; e: string; w: string; d: string; f?: boolean; tone: string }[] = [
    { t: "Marketing Executive", c: "BrightPath Media", l: "Raffles Place", e: "Full-time", w: "Hybrid", d: "2 days ago", f: true, tone: "from-primary to-primary/70 text-primary-foreground" },
    { t: "Content Creator", c: "Lumen Studios", l: "Tanjong Pagar", e: "Contract", w: "Remote", d: "1 day ago", tone: "from-accent to-accent/70 text-accent-foreground" },
    { t: "HR Assistant", c: "Harbourline Group", l: "Jurong East", e: "Full-time", w: "On-site", d: "3 days ago", tone: "from-success to-success/70 text-success-foreground" },
    { t: "Sales Executive", c: "Vertex Solutions", l: "Paya Lebar", e: "Full-time", w: "On-site", d: "Today", f: true, tone: "from-accent to-accent/70 text-accent-foreground" },
    { t: "Graphic Designer", c: "Northstar Creative", l: "Bugis", e: "Part-time", w: "Hybrid", d: "5 days ago", tone: "from-success to-success/70 text-success-foreground" },
    { t: "Customer Service Executive", c: "Merlion Retail", l: "Tampines", e: "Full-time", w: "On-site", d: "1 week ago", tone: "from-primary to-primary/70 text-primary-foreground" },
  ];
  const typeBadge: Record<string, string> = {
    "Full-time": "bg-primary/10 text-primary", "Part-time": "bg-accent/15 text-accent", Contract: "bg-accent/15 text-accent",
  };
  const workBadge: Record<string, string> = {
    Remote: "bg-success/15 text-success", Hybrid: "bg-success/15 text-success", "On-site": "bg-muted text-foreground/70",
  };
  const [saved, setSaved] = useState<string[]>([]);
  const field = "w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground";
  return (
    <section id="jobs" className="relative scroll-mt-28 overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> Hiring now
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">Latest Job Opportunities</h2>
          <div className="mx-auto mt-4 flex w-20 gap-1.5"><span className="h-1 flex-[2] rounded-full bg-primary" /><span className="h-1 flex-1 rounded-full bg-accent" /></div>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">Explore recent job openings from companies in Singapore.</p>
        </div>

        <form onSubmit={e => e.preventDefault()} className="mx-auto mt-10 grid max-w-4xl gap-2 rounded-3xl border border-border bg-card p-2 shadow-soft md:grid-cols-[1.4fr_1fr_1fr_auto] md:rounded-full">
          <label className="flex items-center gap-2 rounded-full px-4 md:border-r md:border-border md:rounded-none"><Search className="h-4 w-4 shrink-0 text-primary" /><input placeholder="Search jobs" className={field} /></label>
          <label className="flex items-center gap-2 px-4 md:border-r md:border-border"><MapPin className="h-4 w-4 shrink-0 text-primary" />
            <select className={field} defaultValue=""><option value="">Location</option>{["Central", "East", "West", "North", "Remote"].map(x => <option key={x}>{x}</option>)}</select>
          </label>
          <label className="flex items-center gap-2 px-4"><Briefcase className="h-4 w-4 shrink-0 text-primary" />
            <select className={field} defaultValue=""><option value="">Job Type</option>{["Full-time", "Part-time", "Contract"].map(x => <option key={x}>{x}</option>)}</select>
          </label>
          <button className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:shadow-lift">Search <Arrow /></button>
        </form>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map(({ t, c, l, e, w, d, f, tone }) => {
            const on = saved.includes(t);
            return (
              <article key={t} className="group relative flex flex-col rounded-[1.75rem] border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lift">
                {f && <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft"><Star className="h-3 w-3" fill="currentColor" /> Featured</span>}
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4">
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-lg font-extrabold shadow-soft ${tone}`}>{c.split(" ").map(x => x[0]).join("").slice(0, 2)}</div>
                  <div className="min-w-0 pt-1">
                    <p className="flex items-center gap-1.5 truncate text-sm font-medium text-muted-foreground"><Building2 className="h-3.5 w-3.5 shrink-0" />{c}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5 shrink-0" />{d}</p>
                  </div>
                  <button aria-label={on ? "Remove bookmark" : "Bookmark job"} onClick={() => setSaved(s => on ? s.filter(x => x !== t) : [...s, t])} className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${on ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                    <Bookmark className="h-4 w-4" fill={on ? "currentColor" : "none"} />
                  </button>
                </div>
                <h3 className="mt-6 text-xl font-extrabold leading-snug tracking-tight text-primary transition-colors group-hover:text-accent">{t}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-foreground/70"><MapPin className="h-4 w-4 shrink-0 text-accent" />{l}, Singapore</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className={`rounded-full px-3 py-1 ${typeBadge[e]}`}>{e}</span>
                  <span className={`rounded-full px-3 py-1 ${workBadge[w]}`}>{w}</span>
                </div>
                <a href="#" className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm font-semibold text-primary">
                  View Job
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-muted-foreground">More opportunities are waiting for you.</p>
          <Btn variant="solid" className="mt-4 px-10 py-3.5 text-base">View All Jobs <Arrow /></Btn>
        </div>
      </div>
    </section>
  );
}


function Articles() {
  const items = [
    ["Interview Tips", "How to Prepare for Your Next Interview", "Practical steps to walk in confident and leave a lasting impression.", "bg-primary"],
    ["Career Growth", "Skills Employers Are Looking For", "The in-demand skills Singapore employers value most this year.", "bg-accent"],
    ["Networking", "How to Build a Strong Professional Network", "Simple habits to grow meaningful connections that open doors.", "bg-success"],
  ];
  return (
    <section id="articles" className="scroll-mt-28 bg-secondary/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead label="Learn & grow" title="Career Insights & Resources" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map(([c, t, d, bar]) => (
            <article key={t} className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
              <div className={`h-2 ${bar}`} />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">{c}</span>
                <h3 className="mt-2 text-lg font-bold text-primary">{t}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
                <a href="#" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Read Article <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center"><Btn variant="outline" className="px-8">Explore All Articles <Arrow /></Btn></div>
      </div>
    </section>
  );
}

function Stories() {
  const t: [string, string, string][] = [
    ["Jobs4U.sg helped me discover opportunities that matched my skills and career goals.", "Rachel Tan", "Marketing Executive"],
    ["The platform made it easier to connect with employers and explore my next career move.", "Daniel Lim", "Sales Executive"],
    ["The career articles gave me the confidence I needed to ace my interviews.", "Priya Nair", "HR Assistant"],
  ];
  const [i, setI] = useState(0);
  const [q, n, r] = t[i]!;
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionHead label="Testimonials" title="Success Stories" sub="Real people. Real opportunities. Real career growth." />
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Img src={storiesImg.url} alt="Jobs4U.sg success stories" />
        <div className="rounded-3xl border border-border bg-card p-8 shadow-lift">
          <Quote className="h-10 w-10 text-accent" />
          <div className="mt-4 flex gap-1 text-accent">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4" fill="currentColor" />)}</div>
          <p className="mt-4 min-h-24 text-lg font-medium leading-relaxed text-foreground">“{q}”</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{n.split(" ").map(x => x[0]).join("")}</div>
            <div><p className="font-bold text-primary">{n}</p><p className="text-sm text-muted-foreground">{r}</p></div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">{t.map((_, k) => <button key={k} aria-label={`Story ${k + 1}`} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-border"}`} />)}</div>
            <div className="flex gap-2">
              <button aria-label="Previous" onClick={() => setI((i + t.length - 1) % t.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border text-primary hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
              <button aria-label="Next" onClick={() => setI((i + 1) % t.length)} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground hover:opacity-90"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const s = ["Talent Sourcing & Recruitment", "HR Advisory Services", "Career Consultation", "Training & Development Programs"];
  return (
    <section id="services" className="scroll-mt-28 bg-secondary/60 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHead center={false} label="For employers & professionals" title="Recruitment & Advisory Services" sub="We provide professional consulting and recruitment solutions to help businesses and individuals succeed." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {s.map(x => <li key={x} className="flex items-start gap-3 rounded-2xl bg-card p-4 font-semibold text-primary shadow-soft"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />{x}</li>)}
          </ul>
          <Btn variant="primary" className="mt-8 px-8">Get Professional Support <Arrow /></Btn>
        </div>
        <Img src={servicesImg.url} alt="Recruitment and advisory services" />
      </div>
    </section>
  );
}

function About() {
  const t = [[Briefcase, "Supporting Job Seekers"], [Users, "Connecting Employers & Talent"], [GraduationCap, "Growing Professional Communities"]] as const;
  return (
    <section id="about" className="mx-auto grid max-w-7xl scroll-mt-28 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
      <Img src={aboutImg.url} alt="About Jobs4U.sg agency" />
      <div>
        <SectionHead center={false} label="About our agency" title="Empowering People. Building Careers." />
        <p className="mt-4 text-muted-foreground sm:text-lg">Jobs4U.sg is committed to bridging the gap between talent and opportunity. We aim to empower individuals and businesses through meaningful connections, valuable resources, and professional support.</p>
        <div className="mt-8 space-y-3">
          {t.map(([I, l]) => <div key={l} className="flex items-center gap-3 font-semibold text-primary"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><I className="h-5 w-5" /></span>{l}</div>)}
        </div>
        <Btn variant="solid" className="mt-8 px-8">Learn More About Us <Arrow /></Btn>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-cta px-6 py-14 text-primary-foreground sm:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/25" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-success/20" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to take the next step?</h2>
            <p className="mt-3 text-lg text-primary-foreground/80">Discover a world of opportunities with Jobs4U.sg today.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Btn variant="primary" href="#jobs" className="px-8">Explore Jobs <Arrow /></Btn>
              <Btn variant="ghostLight" href="#services" className="px-8">Get Professional Support</Btn>
            </div>
          </div>
          <div className="rounded-3xl bg-primary-foreground/10 p-6 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">Have questions?</p>
            <p className="mt-1 text-2xl font-bold">+65 9375 2892</p>
            <Btn variant="wa" href={WA} target="_blank" rel="noopener noreferrer" className="mt-5 w-full"><MessageCircle className="h-5 w-5" /> WhatsApp Us</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = ["About Us", "Careers", "Help Center", "User Agreement", "Privacy Policy", "Cookie Policy"];
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_2fr]">
        <div>
          <img src={logo.url} alt="Jobs4U.sg" className="h-14 w-auto object-contain" />
          <p className="mt-3 font-medium text-primary">Connecting People. Creating Opportunities.</p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Linkedin, Instagram, Twitter].map((I, k) => <a key={k} href="#" aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"><I className="h-4 w-4" /></a>)}
          </div>
        </div>
        <nav className="grid grid-cols-2 gap-3 self-center sm:grid-cols-3">
          {links.map(l => <a key={l} href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">{l}</a>)}
        </nav>
      </div>
      <p className="border-t border-border py-5 text-center text-sm text-muted-foreground">© 2026 Jobs4U.sg. All rights reserved.</p>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero /><Pillars /><HowItWorks /><Jobs /><Articles /><Stories /><Services /><About /><FinalCta />
      </main>
      <Footer />
    </div>
  );
}
