import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  MessageCircle,
  Send,
  Upload,
} from "lucide-react";

interface JobItem {
  id: number | string;
  slug: string;
  title: string;
  company: string;
  description: string;
  location: string;
  employmentType: string;
  workMode?: string | null;
  salary?: string | null;
  whatsappNumber?: string | null;
  createdAt: string;
}

function normalizeWhatsAppNumber(raw?: string | null): string | null {
  if (!raw) return null;
  let digitsOnly = String(raw).replace(/\D+/g, "");
  if (digitsOnly.startsWith("0")) {
    digitsOnly = `62${digitsOnly.slice(1)}`;
  }
  if (digitsOnly.length < 8 || digitsOnly.length > 15) return null;
  return digitsOnly;
}

function buildWhatsAppUrl(params: {
  rawNumber?: string | null;
  jobTitle: string;
  company: string;
}): string | null {
  const phone = normalizeWhatsAppNumber(params.rawNumber);
  if (!phone) return null;

  const message = `Hi, I'm interested in the ${params.jobTitle} position at ${params.company} listed on Jobs4U.sg.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const Route = createFileRoute("/$jobSlug")({
  component: JobDetailRoute,
});

function JobDetailRoute() {
  const { jobSlug } = Route.useParams();
  const formRef = useRef<HTMLDivElement>(null);

  const [job, setJob] = useState<JobItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchDetail() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await fetch(`/api/jobs/${encodeURIComponent(jobSlug)}`);
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Job not found." : "Unable to load job details.");
        }
        const payload = await res.json();
        if (!cancelled) {
          setJob(payload.job ?? payload);
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err instanceof Error ? err.message : "Failed to load job.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    fetchDetail();
    return () => {
      cancelled = true;
    };
  }, [jobSlug]);

  const openApplicationForm = () => {
    setShowApplyForm(true);
    setFormError(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormError(null);

    if (!file) {
      setCvFile(null);
      return;
    }

    const lower = file.name.toLowerCase();
    const okExt = lower.endsWith(".pdf") || lower.endsWith(".doc") || lower.endsWith(".docx");
    const okMime = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.type);

    if (!okExt || !okMime) {
      setCvFile(null);
      e.target.value = "";
      setFormError("Please upload a valid PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setCvFile(null);
      e.target.value = "";
      setFormError("CV file size must not exceed 5MB.");
      return;
    }

    setCvFile(file);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    setFormError(null);

    if (!fullName.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError("Please enter a valid Email Address.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      setFormError("Please enter a valid Phone Number.");
      return;
    }
    if (!coverLetter.trim()) {
      setFormError("Cover Letter is required.");
      return;
    }
    if (!cvFile) {
      setFormError("Please upload your CV/Resume (PDF, DOC, or DOCX).");
      return;
    }

    try {
      setSubmitting(true);
      const body = new FormData();
      body.append("jobId", String(job.id));
      body.append("jobSlug", job.slug);
      body.append("fullName", fullName.trim());
      body.append("email", email.trim());
      body.append("phone", phone.trim());
      body.append("coverLetter", coverLetter.trim());
      body.append("cv", cvFile);

      const res = await fetch("/api/applications", {
        method: "POST",
        body,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Failed to submit application.");
      }

      setSubmitted(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsAppUrl = job
    ? buildWhatsAppUrl({
        rawNumber: job.whatsappNumber,
        jobTitle: job.title,
        company: job.company,
      })
    : null;

  return (
    <div className="min-h-screen bg-secondary/50 pb-20">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <a
            href="/#jobs"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Jobs</span>
          </a>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">Jobs4U.sg</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-10">
        {loading && (
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <p className="text-sm font-medium text-muted-foreground">Loading job details...</p>
          </div>
        )}

        {!loading && errorMsg && (
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <h1 className="text-2xl font-extrabold text-primary">{errorMsg}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The job at <span className="font-mono">/{jobSlug}</span> could not be found.
            </p>
            <a
              href="/#jobs"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Browse Available Jobs
            </a>
          </div>
        )}

        {!loading && job && (
          <>
            <article className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
              <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-2 text-sm font-bold text-accent">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span>{job.company}</span>
                  </p>
                  <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                    {job.title}
                  </h1>

                  <div className="mt-5 flex flex-wrap gap-2.5 text-xs font-semibold sm:text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-1.5 text-foreground/80">
                      <MapPin className="h-4 w-4 text-accent" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-primary">
                      <Briefcase className="h-4 w-4" />
                      {job.employmentType}
                      {job.workMode ? ` • ${job.workMode}` : ""}
                    </span>
                    {job.salary && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3.5 py-1.5 text-success">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3.5 py-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Posted{" "}
                      {new Date(job.createdAt).toLocaleDateString("en-SG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {!submitted && (
                  <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto">
                    <button
                      type="button"
                      onClick={openApplicationForm}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:w-auto"
                    >
                      <span>Apply Now</span>
                      <Send className="h-4 w-4" />
                    </button>

                    {whatsAppUrl && (
                        <a
                            href={whatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-6 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:border-emerald-600/50 hover:bg-emerald-500/20 sm:w-auto"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>Chat via WhatsApp</span>
                        </a>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-8">
                <h2 className="text-xl font-bold text-primary">Job Description</h2>
                <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {job.description}
                </div>
              </div>

              {!showApplyForm && !submitted && (
                <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-secondary/70 p-6 text-center sm:flex-row sm:text-left">
                  <div>
                    <p className="font-bold text-primary">Interested in this role?</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Click Apply Now to upload your CV{whatsAppUrl ? ", or reach out directly via WhatsApp." : "."}
                    </p>
                  </div>
                  <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
                    {whatsAppUrl && (
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-success/60 hover:bg-success/10 hover:text-success sm:w-auto"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={openApplicationForm}
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft sm:w-auto"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              )}
            </article>

            {(showApplyForm || submitted) && (
              <section
                ref={formRef}
                aria-label="Job Application Form"
                className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-lift sm:p-10"
              >
                {submitted ? (
                  <div className="py-6 text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <h2 className="mt-4 text-2xl font-extrabold text-primary">
                      Application Submitted!
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                      Thank you, <span className="font-semibold text-foreground">{fullName}</span>. Your application for{" "}
                      <span className="font-semibold text-foreground">{job.title}</span> at{" "}
                      <span className="font-semibold text-foreground">{job.company}</span> has been submitted.
                    </p>
                    <a
                      href="/#jobs"
                      className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                      Back to Job Listings
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-extrabold text-primary">
                          Apply for {job.title}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Complete all fields below and attach your CV.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="text-xs font-semibold text-muted-foreground hover:text-primary"
                      >
                        Close
                      </button>
                    </div>

                    {formError && (
                      <div
                        role="alert"
                        className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-700"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <form onSubmit={handleApplySubmit} noValidate className="mt-6 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label htmlFor="candidateName" className="block text-sm font-semibold text-primary">
                            Full Name *
                          </label>
                          <input
                            id="candidateName"
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/30"
                          />
                        </div>

                        <div>
                          <label htmlFor="candidateEmail" className="block text-sm font-semibold text-primary">
                            Email Address *
                          </label>
                          <input
                            id="candidateEmail"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="candidatePhone" className="block text-sm font-semibold text-primary">
                          Phone Number *
                        </label>
                        <input
                          id="candidatePhone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+65 9123 4567"
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/30"
                        />
                      </div>

                      <div>
                        <label htmlFor="candidateCoverLetter" className="block text-sm font-semibold text-primary">
                          Cover Letter *
                        </label>
                        <textarea
                          id="candidateCoverLetter"
                          rows={5}
                          required
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          placeholder="Write or paste your cover letter..."
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-ring/30"
                        />
                      </div>

                      <div>
                        <label htmlFor="candidateCv" className="block text-sm font-semibold text-primary">
                          CV / Resume (PDF, DOC, or DOCX — Max 5MB) *
                        </label>
                        <label
                          htmlFor="candidateCv"
                          className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/40 px-4 py-7 text-center transition-colors hover:border-accent"
                        >
                          {cvFile ? (
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                              <FileText className="h-5 w-5 shrink-0 text-accent" />
                              <span className="break-all">{cvFile.name}</span>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-6 w-6 text-muted-foreground" />
                              <span className="mt-2 text-sm font-semibold text-primary">
                                Upload CV / Resume
                              </span>
                              <span className="mt-1 text-xs text-muted-foreground">
                                PDF, DOC, or DOCX up to 5MB
                              </span>
                            </>
                          )}
                          <input
                            id="candidateCv"
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleCvChange}
                            className="sr-only"
                          />
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submitting ? "Submitting..." : "Submit Application"}
                      </button>
                    </form>
                  </>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}