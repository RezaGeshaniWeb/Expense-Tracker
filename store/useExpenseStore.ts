import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ExpenseStore, Transaction, TransactionType } from "@/types/transaction";
import { parseStoredTransactions } from "@/types/transaction";

const STORAGE_KEY = "expense-tracker-storage";

/** Creates a unique id for each new transaction. */
function createTransactionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Sums amounts for a given transaction type. */
export function calculateTotalByType(
  transactions: Transaction[],
  type: TransactionType
): number {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

/** Computes balance as income minus expenses. */
export function calculateBalance(transactions: Transaction[]): number {
  const income = calculateTotalByType(transactions, "income");
  const expenses = calculateTotalByType(transactions, "expense");
  return income - expenses;
}

/** Formats a number as USD currency for display. */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      transactions: [],
      _hasHydrated: false,

      addTransaction: ({ title, amount, type }) => {
        const newTransaction: Transaction = {
          id: createTransactionId(),
          title: title.trim(),
          amount,
          type,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter(
            (transaction) => transaction.id !== id
          ),
        }));
      },

      setHasHydrated: (value) => {
        set({ _hasHydrated: value });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ transactions: state.transactions }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<ExpenseStore> | undefined;
        const parsedTransactions = parseStoredTransactions(
          persisted?.transactions
        );

        return {
          ...currentState,
          transactions: parsedTransactions,
        };
      },
    }
  )
);
