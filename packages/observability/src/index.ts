/**
 * Observability helpers (P00-WP04).
 *
 * Structured logs + correlation + shared API error envelope.
 * Metrics/trace stubs are no-op placeholders — no APM vendor accounts (TDD §26.1 / §35 pending).
 */

import { randomUUID } from "node:crypto";

/** Opaque correlation id shared across logs and API error envelopes. */
export type CorrelationId = string;

export const createCorrelationId = (): CorrelationId => {
  return randomUUID();
};

/**
 * Single shared API error shape (TDD §21.4).
 * Client-safe: stable code + message; no stacks, provider payloads, or secrets.
 */
export type ApiErrorEnvelope = {
  error: {
    code: string;
    message: string;
    correlationId: CorrelationId;
    details?: Record<string, unknown>;
  };
};

export type CreateApiErrorInput = {
  code: string;
  message: string;
  correlationId: CorrelationId;
  details?: Record<string, unknown>;
};

export const createApiError = (input: CreateApiErrorInput): ApiErrorEnvelope => {
  const envelope: ApiErrorEnvelope = {
    error: {
      code: input.code,
      message: input.message,
      correlationId: input.correlationId,
    },
  };
  if (input.details !== undefined) {
    envelope.error.details = input.details;
  }
  return envelope;
};

export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogFields = {
  correlationId?: CorrelationId;
  resource?: string;
  result?: string;
  latencyMs?: number;
  retryCount?: number;
  [key: string]: unknown;
};

export type Logger = {
  debug: (msg: string, fields?: LogFields) => void;
  info: (msg: string, fields?: LogFields) => void;
  warn: (msg: string, fields?: LogFields) => void;
  error: (msg: string, fields?: LogFields) => void;
};

const writeLog = (level: LogLevel, msg: string, fields: LogFields = {}): void => {
  const line = JSON.stringify({
    level,
    msg,
    time: new Date().toISOString(),
    ...fields,
  });
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
};

/** Structured JSON logger. Do not put bodies, coordinates, credentials, or payment data in fields. */
export const createLogger = (defaults: LogFields = {}): Logger => {
  const emit = (level: LogLevel, msg: string, fields?: LogFields) => {
    writeLog(level, msg, { ...defaults, ...fields });
  };
  return {
    debug: (msg, fields) => emit("debug", msg, fields),
    info: (msg, fields) => emit("info", msg, fields),
    warn: (msg, fields) => emit("warn", msg, fields),
    error: (msg, fields) => emit("error", msg, fields),
  };
};

/** No-op counter stub — replaceable with OpenTelemetry-compatible backend later. */
export const incrementCounter = (_name: string, _labels: Record<string, string> = {}): void => {
  // intentionally empty (Phase 0 — no vendor telemetry)
};

export type SpanHandle = {
  end: (result?: string) => void;
};

/** No-op span stub — replaceable with OpenTelemetry-compatible backend later. */
export const startSpan = (_name: string, _attrs: Record<string, string> = {}): SpanHandle => {
  return {
    end: (_result?: string) => {
      // intentionally empty
    },
  };
};
