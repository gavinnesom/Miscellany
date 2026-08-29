"use client";

import { FormEvent, useState } from "react";
import {
  clearStoredSession,
  hasAuthConfig,
  signInWithPassword,
  type AuthLifecycle,
  type AuthSession,
} from "../lib/auth";

type AuthControlProps = {
  session: AuthSession | null;
  lifecycle?: AuthLifecycle;
  status?: string;
};

export function AuthControl({ session, lifecycle = "anonymous", status }: AuthControlProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signInWithPassword(email, password);
      setPassword("");
      setOpen(false);
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Unable to sign in");
    } finally {
      setSubmitting(false);
    }
  }

  if (!hasAuthConfig()) {
    return <p className="auth-status">Sign-in unavailable</p>;
  }

  if (lifecycle === "initializing") {
    return <p className="auth-status">Checking sign-in...</p>;
  }

  if (session) {
    return (
      <div className="auth-control signed-in" aria-label="Gavin session">
        <button type="button" onClick={() => void clearStoredSession()}>Sign out</button>
        <span title={status ?? session.email}>{status ?? session.email}</span>
      </div>
    );
  }

  return (
    <div className="auth-control signed-out">
      <button
        type="button"
        className="auth-entry-button"
        aria-expanded={open}
        aria-controls="auth-popover"
        onClick={() => {
          setError("");
          setOpen((value) => !value);
        }}
      >
        Edit &amp; Review
      </button>
      {open ? (
        <form className="auth-popover" id="auth-popover" onSubmit={handleSubmit}>
          <input
            aria-label="Memory email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
          <input
            aria-label="Memory password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
          <button type="submit" disabled={submitting || !email || !password}>Sign in</button>
          {error || status ? <span>{error || status}</span> : null}
        </form>
      ) : null}
    </div>
  );
}
