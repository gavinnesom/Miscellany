"use client";

import { useCallback, useEffect, useState } from "react";
import type { AuthSession } from "./auth";
import { fetchWithSessionRefresh } from "./auth";
import type { QuizReadinessLoadState, QuizReadinessResponse, QuizReadinessUpdate } from "./quiz-readiness";

export function useQuizReadiness(session: AuthSession | null) {
  const [loadState, setLoadState] = useState<QuizReadinessLoadState>(session ? "loading" : "signed-out");
  const [readyEntrySlugs, setReadyEntrySlugs] = useState<Set<string>>(() => new Set());

  const refresh = useCallback(async (activeSession = session) => {
    if (!activeSession) {
      setReadyEntrySlugs(new Set());
      setLoadState("signed-out");
      return null;
    }

    setLoadState("loading");
    try {
      const response = await fetchWithSessionRefresh(activeSession, "/api/quiz/readiness", { cache: "no-store" });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error ?? "Quiz readiness is unavailable.");
      const result = body as QuizReadinessResponse;
      setReadyEntrySlugs(new Set(result.readyEntrySlugs));
      setLoadState("loaded");
      return result;
    } catch (error) {
      setLoadState("error");
      throw error;
    }
  }, [session]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refresh().catch(() => undefined);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  const update = useCallback(async (updates: QuizReadinessUpdate[], activeSession = session) => {
    if (!activeSession) throw new Error("Sign in to update quiz readiness.");
    const response = await fetchWithSessionRefresh(activeSession, "/api/quiz/readiness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries: updates }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error ?? "Could not save quiz readiness.");
    const result = body as QuizReadinessResponse;
    setReadyEntrySlugs(new Set(result.readyEntrySlugs));
    setLoadState("loaded");
    return result;
  }, [session]);

  return { loadState, readyEntrySlugs, refresh, update };
}
