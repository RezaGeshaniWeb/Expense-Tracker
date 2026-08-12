"use client";

import {
  calculateTotalByType,
  formatCurrency,
  useExpenseStore,
} from "@/store/useExpenseStore";

export default function IncomeExpenseSummary() {
  const transactions = useExpenseStore((state) => state.transactions);
  const hasHydrated = useExpenseStore((state) => state._hasHydrated);

  const totalIncome = calculateTotalByType(transactions, "income");
  const totalExpenses = calculateTotalByType(transactions, "expense");

  return (
    <>
      <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm transition-shadow hover:shadow-md">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
          Total Income
        </p>
        <p
          className="mt-2 text-3xl font-bold text-emerald-700"
          aria-live="polite"
        >
          {hasHydrated ? formatCurrency(totalIncome) : formatCurrency(0)}
        </p>
        <p className="mt-2 text-sm text-emerald-600">
          Money received
        </p>
      </article>

      <article className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm transition-shadow hover:shadow-md">
        <p className="text-sm font-medium uppercase tracking-wide text-rose-700">
          Total Expenses
        </p>
        <p
          className="mt-2 text-3xl font-bold text-rose-700"
          aria-live="polite"
        >
          {hasHydrated ? formatCurrency(totalExpenses) : formatCurrency(0)}
        </p>
        <p className="mt-2 text-sm text-rose-600">
          Money spent
        </p>
      </article>
    </>
  );
}
