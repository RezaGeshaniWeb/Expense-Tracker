export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white"
          >
            $
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Expense Tracker
            </h1>
            <p className="text-sm text-slate-500">
              Manage your income and expenses
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
