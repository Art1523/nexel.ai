import { useSyncExternalStore } from "react";

export type Currency = "USD" | "EUR" | "INR";
export type Billing = "monthly" | "annual";

type State = { currency: Currency; billing: Billing };

let state: State = { currency: "USD", billing: "annual" };
const listeners = new Set<() => void>();

function emit() { listeners.forEach((l) => l()); }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l); }; }
function getSnapshot(): State { return state; }

export function setCurrency(c: Currency) {
  if (state.currency === c) return;
  state = { ...state, currency: c };
  emit();
}
export function setBilling(b: Billing) {
  if (state.billing === b) return;
  state = { ...state, billing: b };
  emit();
}

// Selector-based subscription — components only re-render when their selected slice changes.
export function usePricingSelector<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  );
}

export function useCurrency() { return usePricingSelector((s) => s.currency); }
export function useBilling() { return usePricingSelector((s) => s.billing); }
