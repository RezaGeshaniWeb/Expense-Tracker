"use client";

import { formatCurrency, useExpenseStore } from "@/store/useExpenseStore";
import type { Transaction } from "@/types/transaction";

/** Formats an ISO date string for readable display. */
function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  const handleDelete = () => {
    onDelete(transaction.id);
  };

  return (
    <li
      className={`flex flex-col gap-3 rounded-xl border p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between ${
        isIncome
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-rose-200 bg-rose-50/60"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            isIncome
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {isIncome ? "+" : "−"}
        </span>

        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">
            {transaction.title}
          </p>
          <p className="text-sm text-slate-500">
            {formatDate(transaction.createdAt)} ·{" "}
            <span
              className={
                isIncome ? "font-medium text-emerald-700" : "font-medium text-rose-700"
              }
            >
              {isIncome ? "Income" : "Expense"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p
          className={`text-lg font-bold ${
            isIncome ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {isIncome ? "+" : "−"}
          {formatCurrency(transaction.amount)}
        </p>

        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Delete ${transaction.title}`}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default function TransactionList() {
  const transactions = useExpenseStore((state) => state.transactions);
  const deleteTransaction = useExpenseStore((state) => state.deleteTransaction);
  const hasHydrated = useExpenseStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Transaction History
        </h2>
        <p className="text-sm text-slate-500">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Transaction History
        </h2>
        <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-medium text-brand">
          {transactions.length}{" "}
          {transactions.length === 1 ? "transaction" : "transactions"}
        </span>
      </div>

      {transactions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No transactions yet. Add your first income or expense above.
        </p>
      ) : (
        <ul className="flex flex-col gap-3" aria-label="All transactions">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={deleteTransaction}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
