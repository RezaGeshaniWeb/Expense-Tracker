"use client";

import {
  calculateBalance,
  formatCurrency,
  useExpenseStore,
} from "@/store/useExpenseStore";

export default function BalanceSummary() {
  const transactions = useExpenseStore((state) => state.transactions);
  const hasHydrated = useExpenseStore((state) => state._hasHydrated);

  const balance = calculateBalance(transactions);
  const isNegative = balance < 0;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:col-span-1">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        Total Balance
      </p>
      <p
        className={`mt-2 text-3xl font-bold ${
          isNegative ? "text-rose-600" : "text-brand"
        }`}
        aria-live="polite"
      >
        {hasHydrated ? formatCurrency(balance) : formatCurrency(0)}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Income minus expenses
      </p>
    </article>
  );
}
