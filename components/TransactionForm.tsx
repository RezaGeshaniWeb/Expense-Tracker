"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useExpenseStore } from "@/store/useExpenseStore";
import type {
  FormInputValues,
  FormValidationErrors,
  TransactionType,
} from "@/types/transaction";

const INITIAL_FORM_VALUES: FormInputValues = {
  title: "",
  amount: "",
  type: "",
};

/** Validates form fields and returns user-friendly error messages. */
function validateForm(values: FormInputValues): FormValidationErrors {
  const errors: FormValidationErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title cannot be empty.";
  }

  const parsedAmount = Number(values.amount);
  if (!values.amount.trim()) {
    errors.amount = "Amount is required.";
  } else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
    errors.amount = "Amount must be a valid positive number.";
  }

  if (values.type !== "income" && values.type !== "expense") {
    errors.type = "Please select a transaction type.";
  }

  return errors;
}

/** Returns true when the errors object has at least one message. */
function hasValidationErrors(errors: FormValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export default function TransactionForm() {
  const addTransaction = useExpenseStore((state) => state.addTransaction);

  const [formValues, setFormValues] =
    useState<FormInputValues>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<FormValidationErrors>({});

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear the field error as the user edits.
    if (errors[name as keyof FormValidationErrors]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[name as keyof FormValidationErrors];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formValues);
    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    addTransaction({
      title: formValues.title,
      amount: Number(formValues.amount),
      type: formValues.type as TransactionType,
    });

    setFormValues(INITIAL_FORM_VALUES);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="sm:col-span-2 lg:col-span-1">
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Title / Description
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formValues.title}
          onChange={handleInputChange}
          placeholder="e.g. Groceries"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-sm text-rose-600" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="amount"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={formValues.amount}
          onChange={handleInputChange}
          placeholder="0.00"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          aria-invalid={Boolean(errors.amount)}
          aria-describedby={errors.amount ? "amount-error" : undefined}
        />
        {errors.amount && (
          <p id="amount-error" className="mt-1 text-sm text-rose-600" role="alert">
            {errors.amount}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="type"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formValues.type}
          onChange={handleInputChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          aria-invalid={Boolean(errors.type)}
          aria-describedby={errors.type ? "type-error" : undefined}
        >
          <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {errors.type && (
          <p id="type-error" className="mt-1 text-sm text-rose-600" role="alert">
            {errors.type}
          </p>
        )}
      </div>

      <div className="flex items-end sm:col-span-2 lg:col-span-1">
        <button
          type="submit"
          className="w-full rounded-lg bg-brand px-4 py-2.5 font-semibold text-white transition-colors hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
