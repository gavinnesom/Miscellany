"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchWithSessionRefresh } from "../lib/auth";
import { entryPath } from "../lib/routes";
import { useAuthState } from "../lib/use-auth-session";
import { AuthControl } from "./AuthControl";

type ReviewControlProps = {
  available: boolean;
  count: number;
  active: boolean;
  onToggle: () => void;
};

type SiteHeaderProps = {
  entryCount: number;
  onHome?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onSurprise?: () => void;
  review?: ReviewControlProps;
  search?: ReactNode;
  suppressReview?: boolean;
  surpriseSlugs?: string[];
};

type ReviewSummary = {
  available: boolean;
  total: number;
};

function entryCountLabel(count: number) {
  return `${count} ${count === 1 ? "entry" : "entries"}`;
}

export function SiteHeader({ entryCount, onHome, onSurprise, review, search, suppressReview = false, surpriseSlugs = [] }: SiteHeaderProps) {
  const [fallbackReview, setFallbackReview] = useState<ReviewControlProps | undefined>();
  const authState = useAuthState();
  const session = authState.session;
  const activeReview = suppressReview ? undefined : review ?? (session ? fallbackReview : undefined);

  useEffect(() => {
    if (suppressReview || review !== undefined) return;
    if (!session) return;
    const activeSession = session;
    let cancelled = false;

    async function loadReviewSummary() {
      try {
        const response = await fetchWithSessionRefresh(activeSession, "/api/review/summary", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const summary = await response.json() as ReviewSummary;
        if (!cancelled && summary.available) {
          setFallbackReview((current) => ({
            available: true,
            count: summary.total,
            active: current?.active ?? false,
            onToggle: () => {
              setFallbackReview((latest) => latest ? { ...latest, active: !latest.active } : latest);
            },
          }));
        }
      } catch {
        if (!cancelled) setFallbackReview(undefined);
      }
    }

    loadReviewSummary();
    return () => {
      cancelled = true;
    };
  }, [review, session, suppressReview]);

  function handleSurprise() {
    if (onSurprise) {
      onSurprise();
      return;
    }

    if (surpriseSlugs.length === 0) return;
    const slug = surpriseSlugs[Math.floor(Math.random() * surpriseSlugs.length)];
    window.location.href = entryPath(slug);
  }

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="site-title-block">
          <Link className="brand" href="/" onClick={onHome}>
            Gavin&apos;s Miscellany
          </Link>
          <div className="site-subline">
            <span>Personal encyclopedia and learning curriculum</span>
            <span aria-hidden="true">·</span>
            <span>{entryCountLabel(entryCount)}</span>
          </div>
        </div>
        <nav className="nav-actions" aria-label="Main navigation">
          <button className="header-action header-action-surprise" type="button" onClick={handleSurprise}>Surprise Me</button>
          <Link className="header-action header-action-quiz" href="/quiz">Quiz Me</Link>
          <div className={activeReview?.available ? "review-action-slot" : "review-action-slot empty"} aria-hidden={activeReview?.available ? undefined : true}>
            {activeReview?.available ? (
              <div className="review-global-control">
                <Link className="review-queue-link" href="/review-queue">
                  Review ({activeReview.count})
                </Link>
                <button
                  type="button"
                  className="review-mode-toggle"
                  onClick={activeReview.onToggle}
                  aria-pressed={activeReview.active}
                  aria-label={activeReview.active ? "Hide Review controls" : "Show Review controls"}
                >
                  <span aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
          <div className="account-action-slot">
            <AuthControl session={session} lifecycle={authState.status} status={authState.message || undefined} />
          </div>
        </nav>
      </div>
      {search ? (
        <section className="header-tools" aria-label="Header tools">
          {search}
        </section>
      ) : null}
    </header>
  );
}
