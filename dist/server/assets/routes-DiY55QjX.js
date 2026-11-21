import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Bookmark, Briefcase, Building2, CheckCircle2, ChevronLeft, ChevronRight, Clock, Compass, Facebook, GraduationCap, Instagram, Linkedin, MapPin, Menu, MessageCircle, Quote, Search, Send, Star, Trophy, Twitter, Users, X } from "lucide-react";
//#region src/assets/logo.png
var logo_default = "./assets/logo-BGUFByiK.png";
//#endregion
//#region src/assets/process.png
var process_default = "./assets/process-Dm113DBO.png";
//#endregion
//#region src/assets/stories.png
var stories_default = "./assets/stories-DF5crSLX.png";
//#endregion
//#region src/assets/services.png
var services_default = "./assets/services-BlZk-X_g.png";
//#endregion
//#region src/assets/about.png
var about_default = "./assets/about-Bjf009b0.png";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var logo = { url: logo_default };
var processImg = { url: process_default };
var storiesImg = { url: stories_default };
var servicesImg = { url: services_default };
var aboutImg = { url: about_default };
var WA = "https://wa.me/6593752892";
function Btn({ variant = "primary", children, href = "#", className = "", ...rest }) {
	const v = {
		primary: "bg-accent text-accent-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5",
		solid: "bg-primary text-primary-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5",
		outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
		light: "bg-primary-foreground text-primary hover:-translate-y-0.5",
		ghostLight: "border-2 border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10",
		wa: "bg-success text-success-foreground shadow-soft hover:shadow-lift hover:-translate-y-0.5"
	}[variant];
	return /* @__PURE__ */ jsx("a", {
		href,
		...rest,
		className: `group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${v} ${className}`,
		children
	});
}
var Arrow = () => /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" });
function Img({ src, alt }) {
	return /* @__PURE__ */ jsx("div", {
		className: "overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-lift",
		children: /* @__PURE__ */ jsx("img", {
			src,
			alt,
			loading: "lazy",
			className: "h-auto w-full rounded-2xl object-contain"
		})
	});
}
function SectionHead({ label, title, sub, center = true }) {
	return /* @__PURE__ */ jsxs("div", {
		className: center ? "mx-auto max-w-2xl text-center" : "max-w-xl",
		children: [
			label && /* @__PURE__ */ jsx("p", {
				className: "text-xs font-bold uppercase tracking-[0.18em] text-accent",
				children: label
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl",
				children: title
			}),
			sub && /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-base text-muted-foreground sm:text-lg",
				children: sub
			})
		]
	});
}
function Header() {
	const [open, setOpen] = useState(false);
	const links = [
		["Jobs", "#jobs"],
		["Articles", "#articles"],
		["For Employers", "#services"],
		["About Us", "#about"]
	];
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "#",
						className: "shrink-0",
						children: /* @__PURE__ */ jsx("img", {
							src: logo.url,
							alt: "Jobs4U.sg",
							className: "h-11 w-auto object-contain sm:h-12"
						})
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "relative hidden min-w-0 flex-1 md:block lg:max-w-xs",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
							placeholder: "Search jobs, skills, or articles...",
							className: "w-full rounded-full border border-input bg-muted py-2.5 pl-9 pr-4 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/30"
						})]
					}),
					/* @__PURE__ */ jsx("nav", {
						className: "hidden flex-1 items-center justify-center gap-6 lg:flex",
						children: links.map(([l, h]) => /* @__PURE__ */ jsx("a", {
							href: h,
							className: "text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
							children: l
						}, l))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "ml-auto hidden lg:flex",
						children: /* @__PURE__ */ jsx(Btn, {
							variant: "primary",
							href: "#jobs",
							className: "px-5",
							children: "Explore Jobs"
						})
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setOpen(!open),
						"aria-label": "Toggle menu",
						className: "ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full text-primary hover:bg-secondary md:ml-0 lg:hidden",
						children: open ? /* @__PURE__ */ jsx(X, {}) : /* @__PURE__ */ jsx(Menu, {})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "px-4 pb-3 md:hidden",
				children: /* @__PURE__ */ jsxs("label", {
					className: "relative block",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx("input", {
						placeholder: "Search jobs, skills, or articles...",
						className: "w-full rounded-full border border-input bg-muted py-2.5 pl-9 pr-4 text-sm outline-none focus:border-accent"
					})]
				})
			}),
			open && /* @__PURE__ */ jsxs("div", {
				className: "border-t border-border bg-card px-4 py-4 lg:hidden",
				children: [/* @__PURE__ */ jsx("nav", {
					className: "flex flex-col",
					children: links.map(([l, h]) => /* @__PURE__ */ jsx("a", {
						href: h,
						onClick: () => setOpen(false),
						className: "rounded-lg px-3 py-3 font-medium hover:bg-secondary",
						children: l
					}, l))
				}), /* @__PURE__ */ jsx(Btn, {
					variant: "primary",
					href: "#jobs",
					className: "mt-3 w-full",
					children: "Explore Jobs"
				})]
			})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-hero",
		children: [
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/10" }),
			/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-success/10" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28",
				children: [
					/* @__PURE__ */ jsxs("h1", {
						className: "text-4xl font-extrabold leading-[1.08] tracking-tight text-primary sm:text-6xl lg:text-7xl",
						children: ["Connect with opportunities that ", /* @__PURE__ */ jsx("span", {
							className: "text-accent",
							children: "fit you."
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl",
						children: "Find a job, learn new skills, and expand your professional network — all in one place."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-9 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ jsxs(Btn, {
							variant: "primary",
							href: "#jobs",
							className: "px-8",
							children: ["Explore Jobs ", /* @__PURE__ */ jsx(Arrow, {})]
						}), /* @__PURE__ */ jsx(Btn, {
							variant: "outline",
							href: "#articles",
							className: "px-8",
							children: "Read Career Insights"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-foreground/70",
						children: [
							"Free for job seekers",
							"Singapore-focused",
							"Trusted employers"
						].map((t) => /* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-success" }), t]
						}, t))
					})
				]
			})
		]
	});
}
function Pillars() {
	return /* @__PURE__ */ jsx("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: /* @__PURE__ */ jsx("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: [
				{
					i: Briefcase,
					k: "Find a Job",
					t: "Find a Job",
					d: "Explore job opportunities across various industries.",
					cta: "Explore Jobs",
					href: "#jobs",
					bg: "from-primary/10 via-card to-card",
					glow: "bg-primary/15",
					txt: "text-primary",
					icon: "bg-primary text-primary-foreground",
					hb: "hover:border-primary/50",
					btn: "group-hover:bg-primary"
				},
				{
					i: GraduationCap,
					k: "Learn & Grow",
					t: "Learn a New Skill",
					d: "Access articles, tips, and resources to grow your career.",
					cta: "Explore Articles",
					href: "#articles",
					bg: "from-accent/15 via-card to-card",
					glow: "bg-accent/20",
					txt: "text-accent",
					icon: "bg-accent text-accent-foreground",
					hb: "hover:border-accent/60",
					btn: "group-hover:bg-accent"
				},
				{
					i: Users,
					k: "Connect",
					t: "Expand Your Network",
					d: "Connect with professionals and employers.",
					cta: "Start Networking",
					href: "#",
					bg: "from-success/15 via-card to-card",
					glow: "bg-success/20",
					txt: "text-success",
					icon: "bg-success text-success-foreground",
					hb: "hover:border-success/60",
					btn: "group-hover:bg-success"
				}
			].map(({ i: I, k, t, d, cta, href, bg, glow, txt, icon, hb, btn }, idx) => /* @__PURE__ */ jsxs("a", {
				href,
				className: `group relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] border border-border bg-gradient-to-br ${bg} p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8 ${hb} ${idx === 2 ? "md:col-span-2 lg:col-span-1" : ""}`,
				children: [
					/* @__PURE__ */ jsx("div", { className: `pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full ${glow} opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100` }),
					/* @__PURE__ */ jsx("div", { className: `pointer-events-none absolute -right-6 top-16 h-40 w-40 rounded-full border-2 border-current opacity-10 ${txt}` }),
					/* @__PURE__ */ jsx("div", { className: `pointer-events-none absolute right-24 top-6 h-3 w-3 rounded-full opacity-30 ${icon}` }),
					/* @__PURE__ */ jsx(I, {
						strokeWidth: 1.25,
						className: `pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 opacity-[0.08] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-44 sm:w-44 ${txt}`
					}),
					/* @__PURE__ */ jsx("div", {
						className: "relative flex justify-end",
						children: /* @__PURE__ */ jsx("div", {
							className: `grid h-16 w-16 place-items-center rounded-2xl shadow-lift transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105 ${icon}`,
							children: /* @__PURE__ */ jsx(I, { className: "h-8 w-8" })
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mt-auto pt-8 pr-12",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: `text-xs font-bold uppercase tracking-[0.18em] ${txt}`,
								children: k
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-2 text-2xl font-extrabold tracking-tight text-primary sm:text-[1.7rem]",
								children: t
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-muted-foreground",
								children: d
							}),
							/* @__PURE__ */ jsxs("span", {
								className: `mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold ${txt}`,
								children: [
									cta,
									" ",
									/* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" })
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("span", {
						className: `absolute bottom-7 right-7 grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-primary transition-colors duration-300 group-hover:border-transparent group-hover:text-primary-foreground sm:bottom-8 sm:right-8 ${btn}`,
						children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
					})
				]
			}, t))
		})
	});
}
function HowItWorks() {
	return /* @__PURE__ */ jsx("section", {
		className: "bg-secondary/60 py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(SectionHead, {
				center: false,
				label: "Step by step",
				title: "How Jobs4U.sg Works",
				sub: "A simple and fast process to help you reach your career goals."
			}), /* @__PURE__ */ jsx("ol", {
				className: "mt-8 space-y-4",
				children: [
					{
						n: "01",
						i: Search,
						t: "Tell Us What You Need",
						d: "Start by searching for a role, skill, or topic that interests you."
					},
					{
						n: "02",
						i: Compass,
						t: "Search & Explore",
						d: "Find jobs, read articles, and discover opportunities."
					},
					{
						n: "03",
						i: Send,
						t: "Apply or Connect",
						d: "Apply directly or connect with employers."
					},
					{
						n: "04",
						i: Trophy,
						t: "Achieve Your Goals",
						d: "Get hired, learn new skills, and grow your career."
					}
				].map(({ n, i: I, t, d }) => /* @__PURE__ */ jsxs("li", {
					className: "flex gap-4 rounded-2xl bg-card p-5 shadow-soft transition-transform hover:translate-x-1",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-2xl font-extrabold text-accent",
						children: n
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsxs("h3", {
							className: "flex items-center gap-2 font-bold text-primary",
							children: [/* @__PURE__ */ jsx(I, { className: "h-4 w-4 shrink-0" }), t]
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: d
						})]
					})]
				}, n))
			})] }), /* @__PURE__ */ jsx(Img, {
				src: processImg.url,
				alt: "How Jobs4U.sg works — step-by-step process"
			})]
		})
	});
}
function Jobs() {
	const jobs = [
		{
			t: "Marketing Executive",
			c: "BrightPath Media",
			l: "Raffles Place",
			e: "Full-time",
			w: "Hybrid",
			d: "2 days ago",
			f: true,
			tone: "from-primary to-primary/70 text-primary-foreground"
		},
		{
			t: "Content Creator",
			c: "Lumen Studios",
			l: "Tanjong Pagar",
			e: "Contract",
			w: "Remote",
			d: "1 day ago",
			tone: "from-accent to-accent/70 text-accent-foreground"
		},
		{
			t: "HR Assistant",
			c: "Harbourline Group",
			l: "Jurong East",
			e: "Full-time",
			w: "On-site",
			d: "3 days ago",
			tone: "from-success to-success/70 text-success-foreground"
		},
		{
			t: "Sales Executive",
			c: "Vertex Solutions",
			l: "Paya Lebar",
			e: "Full-time",
			w: "On-site",
			d: "Today",
			f: true,
			tone: "from-accent to-accent/70 text-accent-foreground"
		},
		{
			t: "Graphic Designer",
			c: "Northstar Creative",
			l: "Bugis",
			e: "Part-time",
			w: "Hybrid",
			d: "5 days ago",
			tone: "from-success to-success/70 text-success-foreground"
		},
		{
			t: "Customer Service Executive",
			c: "Merlion Retail",
			l: "Tampines",
			e: "Full-time",
			w: "On-site",
			d: "1 week ago",
			tone: "from-primary to-primary/70 text-primary-foreground"
		}
	];
	const typeBadge = {
		"Full-time": "bg-primary/10 text-primary",
		"Part-time": "bg-accent/15 text-accent",
		Contract: "bg-accent/15 text-accent"
	};
	const workBadge = {
		Remote: "bg-success/15 text-success",
		Hybrid: "bg-success/15 text-success",
		"On-site": "bg-muted text-foreground/70"
	};
	const [saved, setSaved] = useState([]);
	const field = "w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground";
	return /* @__PURE__ */ jsxs("section", {
		id: "jobs",
		className: "relative scroll-mt-28 overflow-hidden py-24",
		children: [/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/5 blur-3xl" }), /* @__PURE__ */ jsxs("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent",
							children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-accent" }), " Hiring now"]
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl",
							children: "Latest Job Opportunities"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto mt-4 flex w-20 gap-1.5",
							children: [/* @__PURE__ */ jsx("span", { className: "h-1 flex-[2] rounded-full bg-primary" }), /* @__PURE__ */ jsx("span", { className: "h-1 flex-1 rounded-full bg-accent" })]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-base text-muted-foreground sm:text-lg",
							children: "Explore recent job openings from companies in Singapore."
						})
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: (e) => e.preventDefault(),
					className: "mx-auto mt-10 grid max-w-4xl gap-2 rounded-3xl border border-border bg-card p-2 shadow-soft md:grid-cols-[1.4fr_1fr_1fr_auto] md:rounded-full",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 rounded-full px-4 md:border-r md:border-border md:rounded-none",
							children: [/* @__PURE__ */ jsx(Search, { className: "h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ jsx("input", {
								placeholder: "Search jobs",
								className: field
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 px-4 md:border-r md:border-border",
							children: [/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ jsxs("select", {
								className: field,
								defaultValue: "",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Location"
								}), [
									"Central",
									"East",
									"West",
									"North",
									"Remote"
								].map((x) => /* @__PURE__ */ jsx("option", { children: x }, x))]
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "flex items-center gap-2 px-4",
							children: [/* @__PURE__ */ jsx(Briefcase, { className: "h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ jsxs("select", {
								className: field,
								defaultValue: "",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Job Type"
								}), [
									"Full-time",
									"Part-time",
									"Contract"
								].map((x) => /* @__PURE__ */ jsx("option", { children: x }, x))]
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							className: "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:shadow-lift",
							children: ["Search ", /* @__PURE__ */ jsx(Arrow, {})]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: jobs.map(({ t, c, l, e, w, d, f, tone }) => {
						const on = saved.includes(t);
						return /* @__PURE__ */ jsxs("article", {
							className: "group relative flex flex-col rounded-[1.75rem] border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lift",
							children: [
								f && /* @__PURE__ */ jsxs("span", {
									className: "absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground shadow-soft",
									children: [/* @__PURE__ */ jsx(Star, {
										className: "h-3 w-3",
										fill: "currentColor"
									}), " Featured"]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: `grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-lg font-extrabold shadow-soft ${tone}`,
											children: c.split(" ").map((x) => x[0]).join("").slice(0, 2)
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "min-w-0 pt-1",
											children: [/* @__PURE__ */ jsxs("p", {
												className: "flex items-center gap-1.5 truncate text-sm font-medium text-muted-foreground",
												children: [/* @__PURE__ */ jsx(Building2, { className: "h-3.5 w-3.5 shrink-0" }), c]
											}), /* @__PURE__ */ jsxs("p", {
												className: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5 shrink-0" }), d]
											})]
										}),
										/* @__PURE__ */ jsx("button", {
											"aria-label": on ? "Remove bookmark" : "Bookmark job",
											onClick: () => setSaved((s) => on ? s.filter((x) => x !== t) : [...s, t]),
											className: `grid h-10 w-10 place-items-center rounded-full border transition-colors ${on ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`,
											children: /* @__PURE__ */ jsx(Bookmark, {
												className: "h-4 w-4",
												fill: on ? "currentColor" : "none"
											})
										})
									]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-6 text-xl font-extrabold leading-snug tracking-tight text-primary transition-colors group-hover:text-accent",
									children: t
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "mt-2 flex items-center gap-1.5 text-sm text-foreground/70",
									children: [
										/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 shrink-0 text-accent" }),
										l,
										", Singapore"
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-5 flex flex-wrap gap-2 text-xs font-semibold",
									children: [/* @__PURE__ */ jsx("span", {
										className: `rounded-full px-3 py-1 ${typeBadge[e]}`,
										children: e
									}), /* @__PURE__ */ jsx("span", {
										className: `rounded-full px-3 py-1 ${workBadge[w]}`,
										children: w
									})]
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "#",
									className: "mt-6 flex items-center justify-between border-t border-border pt-5 text-sm font-semibold text-primary",
									children: ["View Job", /* @__PURE__ */ jsx("span", {
										className: "grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground",
										children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
									})]
								})
							]
						}, t);
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-14 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-muted-foreground",
						children: "More opportunities are waiting for you."
					}), /* @__PURE__ */ jsxs(Btn, {
						variant: "solid",
						className: "mt-4 px-10 py-3.5 text-base",
						children: ["View All Jobs ", /* @__PURE__ */ jsx(Arrow, {})]
					})]
				})
			]
		})]
	});
}
function Articles() {
	return /* @__PURE__ */ jsx("section", {
		id: "articles",
		className: "scroll-mt-28 bg-secondary/60 py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ jsx(SectionHead, {
					label: "Learn & grow",
					title: "Career Insights & Resources"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: [
						[
							"Interview Tips",
							"How to Prepare for Your Next Interview",
							"Practical steps to walk in confident and leave a lasting impression.",
							"bg-primary"
						],
						[
							"Career Growth",
							"Skills Employers Are Looking For",
							"The in-demand skills Singapore employers value most this year.",
							"bg-accent"
						],
						[
							"Networking",
							"How to Build a Strong Professional Network",
							"Simple habits to grow meaningful connections that open doors.",
							"bg-success"
						]
					].map(([c, t, d, bar]) => /* @__PURE__ */ jsxs("article", {
						className: "group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
						children: [/* @__PURE__ */ jsx("div", { className: `h-2 ${bar}` }), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-1 flex-col p-6",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-xs font-bold uppercase tracking-wider text-accent",
									children: c
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-2 text-lg font-bold text-primary",
									children: t
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 flex-1 text-sm text-muted-foreground",
									children: d
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "#",
									className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary",
									children: ["Read Article ", /* @__PURE__ */ jsx(Arrow, {})]
								})
							]
						})]
					}, t))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-10 text-center",
					children: /* @__PURE__ */ jsxs(Btn, {
						variant: "outline",
						className: "px-8",
						children: ["Explore All Articles ", /* @__PURE__ */ jsx(Arrow, {})]
					})
				})
			]
		})
	});
}
function Stories() {
	const t = [
		[
			"Jobs4U.sg helped me discover opportunities that matched my skills and career goals.",
			"Rachel Tan",
			"Marketing Executive"
		],
		[
			"The platform made it easier to connect with employers and explore my next career move.",
			"Daniel Lim",
			"Sales Executive"
		],
		[
			"The career articles gave me the confidence I needed to ace my interviews.",
			"Priya Nair",
			"HR Assistant"
		]
	];
	const [i, setI] = useState(0);
	const [q, n, r] = t[i];
	return /* @__PURE__ */ jsxs("section", {
		className: "mx-auto max-w-7xl px-4 py-20 sm:px-6",
		children: [/* @__PURE__ */ jsx(SectionHead, {
			label: "Testimonials",
			title: "Success Stories",
			sub: "Real people. Real opportunities. Real career growth."
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-12 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]",
			children: [/* @__PURE__ */ jsx(Img, {
				src: storiesImg.url,
				alt: "Jobs4U.sg success stories"
			}), /* @__PURE__ */ jsxs("div", {
				className: "rounded-3xl border border-border bg-card p-8 shadow-lift",
				children: [
					/* @__PURE__ */ jsx(Quote, { className: "h-10 w-10 text-accent" }),
					/* @__PURE__ */ jsx("div", {
						className: "mt-4 flex gap-1 text-accent",
						children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ jsx(Star, {
							className: "h-4 w-4",
							fill: "currentColor"
						}, k))
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-4 min-h-24 text-lg font-medium leading-relaxed text-foreground",
						children: [
							"“",
							q,
							"”"
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground",
							children: n.split(" ").map((x) => x[0]).join("")
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-bold text-primary",
							children: n
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: r
						})] })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							children: t.map((_, k) => /* @__PURE__ */ jsx("button", {
								"aria-label": `Story ${k + 1}`,
								onClick: () => setI(k),
								className: `h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-border"}`
							}, k))
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx("button", {
								"aria-label": "Previous",
								onClick: () => setI((i + t.length - 1) % t.length),
								className: "grid h-10 w-10 place-items-center rounded-full border border-border text-primary hover:bg-secondary",
								children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsx("button", {
								"aria-label": "Next",
								onClick: () => setI((i + 1) % t.length),
								className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground hover:opacity-90",
								children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
							})]
						})]
					})
				]
			})]
		})]
	});
}
function Services() {
	return /* @__PURE__ */ jsx("section", {
		id: "services",
		className: "scroll-mt-28 bg-secondary/60 py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx(SectionHead, {
					center: false,
					label: "For employers & professionals",
					title: "Recruitment & Advisory Services",
					sub: "We provide professional consulting and recruitment solutions to help businesses and individuals succeed."
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "mt-8 grid gap-3 sm:grid-cols-2",
					children: [
						"Talent Sourcing & Recruitment",
						"HR Advisory Services",
						"Career Consultation",
						"Training & Development Programs"
					].map((x) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 rounded-2xl bg-card p-4 font-semibold text-primary shadow-soft",
						children: [/* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-success" }), x]
					}, x))
				}),
				/* @__PURE__ */ jsxs(Btn, {
					variant: "primary",
					className: "mt-8 px-8",
					children: ["Get Professional Support ", /* @__PURE__ */ jsx(Arrow, {})]
				})
			] }), /* @__PURE__ */ jsx(Img, {
				src: servicesImg.url,
				alt: "Recruitment and advisory services"
			})]
		})
	});
}
function About() {
	const t = [
		[Briefcase, "Supporting Job Seekers"],
		[Users, "Connecting Employers & Talent"],
		[GraduationCap, "Growing Professional Communities"]
	];
	return /* @__PURE__ */ jsxs("section", {
		id: "about",
		className: "mx-auto grid max-w-7xl scroll-mt-28 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ jsx(Img, {
			src: aboutImg.url,
			alt: "About Jobs4U.sg agency"
		}), /* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx(SectionHead, {
				center: false,
				label: "About our agency",
				title: "Empowering People. Building Careers."
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-4 text-muted-foreground sm:text-lg",
				children: "Jobs4U.sg is committed to bridging the gap between talent and opportunity. We aim to empower individuals and businesses through meaningful connections, valuable resources, and professional support."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-8 space-y-3",
				children: t.map(([I, l]) => /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 font-semibold text-primary",
					children: [/* @__PURE__ */ jsx("span", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent",
						children: /* @__PURE__ */ jsx(I, { className: "h-5 w-5" })
					}), l]
				}, l))
			}),
			/* @__PURE__ */ jsxs(Btn, {
				variant: "solid",
				className: "mt-8 px-8",
				children: ["Learn More About Us ", /* @__PURE__ */ jsx(Arrow, {})]
			})
		] })]
	});
}
function FinalCta() {
	return /* @__PURE__ */ jsx("section", {
		className: "px-4 pb-20 sm:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-cta px-6 py-14 text-primary-foreground sm:px-12",
			children: [
				/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/25" }),
				/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-success/20" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl font-extrabold tracking-tight sm:text-4xl",
							children: "Ready to take the next step?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-lg text-primary-foreground/80",
							children: "Discover a world of opportunities with Jobs4U.sg today."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ jsxs(Btn, {
								variant: "primary",
								href: "#jobs",
								className: "px-8",
								children: ["Explore Jobs ", /* @__PURE__ */ jsx(Arrow, {})]
							}), /* @__PURE__ */ jsx(Btn, {
								variant: "ghostLight",
								href: "#services",
								className: "px-8",
								children: "Get Professional Support"
							})]
						})
					] }), /* @__PURE__ */ jsxs("div", {
						className: "rounded-3xl bg-primary-foreground/10 p-6 backdrop-blur",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-semibold uppercase tracking-wider text-primary-foreground/70",
								children: "Have questions?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-2xl font-bold",
								children: "+65 9375 2892"
							}),
							/* @__PURE__ */ jsxs(Btn, {
								variant: "wa",
								href: WA,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-5 w-full",
								children: [/* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }), " WhatsApp Us"]
							})
						]
					})]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "border-t border-border bg-card",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1fr_2fr]",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("img", {
					src: logo.url,
					alt: "Jobs4U.sg",
					className: "h-14 w-auto object-contain"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 font-medium text-primary",
					children: "Connecting People. Creating Opportunities."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-5 flex gap-2",
					children: [
						Facebook,
						Linkedin,
						Instagram,
						Twitter
					].map((I, k) => /* @__PURE__ */ jsx("a", {
						href: "#",
						"aria-label": "Social link",
						className: "grid h-10 w-10 place-items-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground",
						children: /* @__PURE__ */ jsx(I, { className: "h-4 w-4" })
					}, k))
				})
			] }), /* @__PURE__ */ jsx("nav", {
				className: "grid grid-cols-2 gap-3 self-center sm:grid-cols-3",
				children: [
					"About Us",
					"Careers",
					"Help Center",
					"User Agreement",
					"Privacy Policy",
					"Cookie Policy"
				].map((l) => /* @__PURE__ */ jsx("a", {
					href: "#",
					className: "text-sm text-muted-foreground transition-colors hover:text-primary",
					children: l
				}, l))
			})]
		}), /* @__PURE__ */ jsx("p", {
			className: "border-t border-border py-5 text-center text-sm text-muted-foreground",
			children: "© 2026 Jobs4U.sg. All rights reserved."
		})]
	});
}
function Index() {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen overflow-x-hidden",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsxs("main", { children: [
				/* @__PURE__ */ jsx(Hero, {}),
				/* @__PURE__ */ jsx(Pillars, {}),
				/* @__PURE__ */ jsx(HowItWorks, {}),
				/* @__PURE__ */ jsx(Jobs, {}),
				/* @__PURE__ */ jsx(Articles, {}),
				/* @__PURE__ */ jsx(Stories, {}),
				/* @__PURE__ */ jsx(Services, {}),
				/* @__PURE__ */ jsx(About, {}),
				/* @__PURE__ */ jsx(FinalCta, {})
			] }),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { Index as component };
