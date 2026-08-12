export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  createdAt: string;
}

export interface FormInputValues {
  title: string;
  amount: string;
  type: TransactionType | "";
}

export interface FormValidationErrors {
  title?: string;
  amount?: string;
  type?: string;
}

export interface ExpenseStoreState {
  transactions: Transaction[];
  _hasHydrated: boolean;
}

export interface ExpenseStoreActions {
  addTransaction: (input: {
    title: string;
    amount: number;
    type: TransactionType;
  }) => void;
  deleteTransaction: (id: string) => void;
  setHasHydrated: (value: boolean) => void;
}

export type ExpenseStore = ExpenseStoreState & ExpenseStoreActions;

/** Validates and narrows unknown JSON from LocalStorage into Transaction[]. */
export function parseStoredTransactions(data: unknown): Transaction[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(isValidTransaction);
}

function isValidTransaction(item: unknown): item is Transaction {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const record = item as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    typeof record.title === "string" &&
    typeof record.amount === "number" &&
    record.amount > 0 &&
    (record.type === "income" || record.type === "expense") &&
    typeof record.createdAt === "string"
  );
}
