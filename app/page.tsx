import Header from "@/components/Header";
import BalanceSummary from "@/components/BalanceSummary";
import IncomeExpenseSummary from "@/components/IncomeExpenseSummary";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section
          aria-label="Financial summary"
          className="grid gap-4 md:grid-cols-3"
        >
          <BalanceSummary />
          <IncomeExpenseSummary />
        </section>

        <section
          aria-label="Add transaction"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Add Transaction
          </h2>
          <TransactionForm />
        </section>

        <section aria-label="Transaction history">
          <TransactionList />
        </section>
      </main>
    </div>
  );
}
