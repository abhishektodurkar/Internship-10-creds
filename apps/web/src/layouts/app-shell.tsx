import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { getDashboard } from '../features/core/dashboard/dashboard-service';
import { listEmployees, createEmployee } from '../features/core/employees/employee-service';
import { listDepartments } from '../features/core/departments/department-service';
import { listAttendance } from '../features/core/attendance/attendance-service';
import { listBatches, listMachineLogs } from '../features/industry/manufacturing/service';
import { listShipments } from '../features/industry/logistics/service';
import { listInventory } from '../features/industry/retail/service';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { chatWithAi, uploadCompanyPdf } from '../features/core/api/ai-client';

export function AppShell(): JSX.Element {
  const token = import.meta.env.VITE_DEV_JWT_TOKEN as string | undefined;
  const [dashboard, setDashboard] = useState<{ employees: number; departments: number; openLeaves: number; todayAttendance: number } | null>(null);
  const [employees, setEmployees] = useState<Array<{ id: string; fullName: string; employeeCode: string; monthlySalary: number }>>([]);
  const [departments, setDepartments] = useState<Array<{ id: string; name: string; _count?: { employees: number } }>>([]);
  const [attendance, setAttendance] = useState<Array<{ id: string; employee: { fullName: string }; checkInAt: string; overtimeMins: number }>>([]);
  const [batches, setBatches] = useState<Array<{ id: string; batchNo: string; status: string }>>([]);
  const [shipments, setShipments] = useState<Array<{ id: string; trackingNo: string; status: string }>>([]);
  const [inventory, setInventory] = useState<Array<{ id: string; sku: string; quantity: number }>>([]);
  const [machineLogs, setMachineLogs] = useState<Array<{ id: string; machineCode: string; runtimeMinutes: number; downtimeMinutes: number }>>([]);
  const [form, setForm] = useState({ fullName: '', employeeCode: '', monthlySalary: 0 });
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');

  useEffect(() => {
    if (!token) return;
    Promise.all([getDashboard(token), listEmployees(token), listDepartments(token), listAttendance(token), listBatches(token), listShipments(token), listInventory(token), listMachineLogs(token)]).then(([d, e, dep, att, b, s, i, ml]) => {
      setDashboard(d.kpis); setEmployees(e); setDepartments(dep); setAttendance(att); setBatches(b); setShipments(s); setInventory(i); setMachineLogs(ml);
    });
  }, [token]);

  const machineChartData = useMemo(() => machineLogs.slice(0, 8).map((row) => ({ machine: row.machineCode, runtime: row.runtimeMinutes, downtime: row.downtimeMinutes })), [machineLogs]);

  async function onCreateEmployee(): Promise<void> {
    if (!token) return;
    const created = await createEmployee(token, form);
    setEmployees((prev) => [created, ...prev]);
  }

  return (
    <div className="grid min-h-screen grid-cols-[18rem_1fr] gap-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <Sidebar />
      <main className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold">AEMS Industry ERP Control Center</h1>
        <section className="grid grid-cols-4 gap-4">{dashboard && Object.entries(dashboard).map(([k,v]) => <article key={k} className="rounded-xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs text-slate-400">{k}</p><p className="text-2xl font-semibold">{v}</p></article>)}</section>
        <section className="grid grid-cols-2 gap-6">
          <article className="rounded-xl border border-white/10 p-4"><h2 className="mb-3 text-lg">Employee Management</h2><div className="mb-3 grid grid-cols-3 gap-2"><input className="rounded bg-slate-800 p-2" placeholder="Name" onChange={(e)=>setForm((f)=>({...f,fullName:e.target.value}))}/><input className="rounded bg-slate-800 p-2" placeholder="Code" onChange={(e)=>setForm((f)=>({...f,employeeCode:e.target.value}))}/><input className="rounded bg-slate-800 p-2" placeholder="Salary" type="number" onChange={(e)=>setForm((f)=>({...f,monthlySalary:Number(e.target.value)}))}/></div><button className="rounded bg-indigo-500 px-3 py-2" onClick={() => void onCreateEmployee()}>Create Employee</button><div className="mt-4 max-h-52 space-y-2 overflow-auto">{employees.map((e)=><div key={e.id} className="rounded bg-slate-900 p-2 text-sm">{e.fullName} · {e.employeeCode} · ${Number(e.monthlySalary)}</div>)}</div></article>
          <article className="rounded-xl border border-white/10 p-4"><h2 className="mb-3 text-lg">Departments & Attendance</h2><div className="space-y-2">{departments.map((d)=><div key={d.id} className="rounded bg-slate-900 p-2 text-sm">{d.name} ({d._count?.employees ?? 0})</div>)}</div><h3 className="mt-4 text-md">Recent Attendance</h3><div className="max-h-40 space-y-2 overflow-auto">{attendance.slice(0,8).map((a)=><div key={a.id} className="rounded bg-slate-900 p-2 text-sm">{a.employee.fullName} · {new Date(a.checkInAt).toLocaleString()} · OT {a.overtimeMins}m</div>)}</div></article>
        </section>
        <section className="grid grid-cols-3 gap-6">
          <article className="rounded-xl border border-white/10 p-4"><h2 className="mb-2">Manufacturing Batches</h2><div className="space-y-2">{batches.slice(0,8).map((b)=><div key={b.id} className="rounded bg-slate-900 p-2 text-sm">{b.batchNo} · {b.status}</div>)}</div></article>
          <article className="rounded-xl border border-white/10 p-4"><h2 className="mb-2">Shipment Lifecycle</h2><div className="space-y-2">{shipments.slice(0,8).map((s)=><div key={s.id} className="rounded bg-slate-900 p-2 text-sm">{s.trackingNo} · {s.status}</div>)}</div></article>
          <article className="rounded-xl border border-white/10 p-4"><h2 className="mb-2">Retail Inventory</h2><div className="space-y-2">{inventory.slice(0,8).map((i)=><div key={i.id} className="rounded bg-slate-900 p-2 text-sm">{i.sku} · Qty {i.quantity}</div>)}</div></article>
        </section>
        <section className="rounded-xl border border-white/10 p-4"><h2 className="mb-3 text-lg">Machine Runtime vs Downtime</h2><div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={machineChartData}><XAxis dataKey="machine" /><YAxis /><Tooltip /><Bar dataKey="runtime" fill="#4f46e5" /><Bar dataKey="downtime" fill="#ef4444" /></BarChart></ResponsiveContainer></div></section>
        <section className="rounded-xl border border-white/10 p-4"><h2 className="mb-3 text-lg">AI Assistant (RAG)</h2><div className="flex gap-2"><input className="w-full rounded bg-slate-800 p-2" value={question} onChange={(e)=>setQuestion(e.target.value)} placeholder="Ask about SOP, attendance, production, logistics..."/><button className="rounded bg-emerald-500 px-3 py-2" onClick={async()=>{const cid=import.meta.env.VITE_DEV_COMPANY_ID as string; const r=await chatWithAi(cid, question); setAiAnswer(`${r.answer}\nSources: ${r.citations.join(', ')}`);}}>Ask</button></div><div className="mt-3"><input type="file" accept="application/pdf" onChange={async (e)=>{const f=e.target.files?.[0]; if(!f) return; const cid=import.meta.env.VITE_DEV_COMPANY_ID as string; await uploadCompanyPdf(cid,f);}}/></div><pre className="mt-3 whitespace-pre-wrap rounded bg-slate-900 p-3 text-sm">{aiAnswer}</pre></section>
      </main>
    </div>
  );
}
