"use client";

import { useEffect, useState } from "react";
import {
  getInitialAuthState,
  hasAuthConfig,
  subscribeToAuthChanges,
  type AuthSession,
  type AuthState,
} from "./auth";

const initializingState: AuthState = {
  status: "initializing",
  session: null,
  message: "",
};

export function useAuthState() {
  const [state, setState] = useState<AuthState>({ status: "anonymous", session: null, message: "" });

  useEffect(() => {
    if (!hasAuthConfig()) return;

    let cancelled = false;
    const unsubscribe = subscribeToAuthChanges((nextState) => {
      if (!cancelled) setState(nextState);
    });

    void Promise.resolve()
      .then(() => {
        if (!cancelled) setState(initializingState);
        return getInitialAuthState();
      })
      .then((nextState) => {
        if (!cancelled) setState(nextState);
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            status: "expired",
            session: null,
            message: "Your session expired - please sign in again.",
          });
        }
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return state;
}

export function useAuthSession(): AuthSession | null {
  return useAuthState().session;
}
