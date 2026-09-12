"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWithSessionRefresh } from "../lib/auth";
import type { ReviewRequest } from "../lib/review";
import type { ReviewSummary } from "../lib/review";
import { reviewEntryPath } from "../lib/routes";
import { useAuthSession } from "../lib/use-auth-session";
import { SiteHeader } from "./SiteHeader";

function formatCreated(created: string) {
  const parsed = new Date(created);
  if (Number.isNaN(parsed.getTime())) return created;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
}

function reviewTimeLabel(request: ReviewRequest) {
  const updated = request.updated && request.updated !== request.created
    ? ` · updated ${formatCreated(request.updated)}`
    : "";
  return `created ${formatCreated(request.created)}${updated}`;
}

function excerpt(value: string) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return "";
  return clean.length > 180 ? `${clean.slice(0, 177)}...` : clean;
}

export function ReviewQueueClient({ entryCount, surpriseSlugs }: { entryCount: number; surpriseSlugs: string[] }) {
  const session = useAuthSession();
  const [summary, setSummary] = useState<ReviewSummary>({ available: false, total: 0, pending: [] });
  const [status, setStatus] = useState("Loading...");
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const pending = summary.pending;

  useEffect(() => {
    let cancelled = false;

    async function loadReviewQueue() {
      if (!session) {
        setSummary({ available: false, total: 0, pending: [] });
        setStatus("");
        setError("");
        return;
      }

      setStatus("Loading...");
      setError("");
      try {
        const response = await fetchWithSessionRefresh(session, "/api/review/summary", {
          cache: "no-store",
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "Could not load review queue.");
        if (!cancelled) {
          setSummary(result);
          setStatus("");
        }
      } catch (loadError) {
        if (!cancelled) {
          setStatus("");
          setError(loadError instanceof Error ? loadError.message : "Could not load review queue.");
        }
      }
    }

    loadReviewQueue();
    return () => {
      cancelled = true;
    };
  }, [session]);

  async function downloadExport() {
    if (!session) return;

    setExporting(true);
    setError("");
    try {
      const response = await fetchWithSessionRefresh(session, "/api/review/export", {
        cache: "no-store",
      });
      const blob = await response.blob();
      if (!response.ok) {
        const message = await blob.text().catch(() => "");
        throw new Error(message || "Could not export review queue.");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "miscellany-review-queue.json";
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : "Could not export review queue.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="directory-page review-queue-page">
      <SiteHeader entryCount={entryCount} surpriseSlugs={surpriseSlugs} suppressReview />

      <header className="directory-hero">
        <p className="eyebrow">Editorial review</p>
        <h1>Review Queue</h1>
        <p className="lede">What Gavin has flagged for later AI review.</p>
      </header>

      <section className="directory-shell">
        <section className="directory-section review-queue-actions" aria-label="Review queue actions">
          <strong>{session ? `${pending.length} pending` : "Sign in required"}</strong>
          {session && summary.available ? (
            <button type="button" onClick={downloadExport} disabled={exporting}>
              {exporting ? "Exporting..." : "Download JSON"}
            </button>
          ) : null}
          {status ? <span>{status}</span> : null}
          {error ? <span className="review-error">{error}</span> : null}
        </section>

        <section className="directory-section" aria-labelledby="pending-reviews-heading">
          <h2 id="pending-reviews-heading">Pending Requests</h2>
          {!session ? <p className="empty-list">Sign in to view the Review Queue.</p> : null}
          {session && pending.length === 0 ? <p className="empty-list">No pending review requests.</p> : null}
          <div className="review-queue-list">
            {pending.map((request) => (
              <article className="review-queue-item" key={request.id}>
                <div>
                  <h3>{request.entry_title}</h3>
                  <small>{reviewTimeLabel(request)}</small>
                </div>
                {request.message ? <p>{excerpt(request.message)}</p> : <p className="empty-list">No note supplied.</p>}
                {request.selected_text ? <blockquote>{excerpt(request.selected_text)}</blockquote> : null}
                <Link href={reviewEntryPath(request.entry)}>Open entry</Link>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
