// Neutral error reporter shim. Replace with Sentry / your provider if needed.
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof console !== "undefined") {
    // eslint-disable-next-line no-console
    console.error("[error-reporter]", error, context);
  }
}
