import { Sidebar } from '../components/sidebar';

export function AppShell(): JSX.Element {
  return (
    <div className="grid min-h-screen grid-cols-[18rem_1fr] gap-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <Sidebar />
      <main className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold">Adaptive Enterprise Management System</h1>
        <p className="mt-2 text-slate-400">Dynamic module workspace with tenant-aware manifest rendering.</p>
      </main>
    </div>
  );
}
