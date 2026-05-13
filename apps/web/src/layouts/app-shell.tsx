import { useEffect, useState } from 'react';
import { Sidebar } from '../components/sidebar';
import { getDashboard } from '../features/core/dashboard/dashboard-service';
import { listEmployees, createEmployee } from '../features/core/employees/employee-service';
import { listDepartments } from '../features/core/departments/department-service';
import { listAttendance } from '../features/core/attendance/attendance-service';

export function AppShell(): JSX.Element {
  const token = import.meta.env.VITE_DEV_JWT_TOKEN as string | undefined;
  const [dashboard, setDashboard] = useState<{ employees: number; departments: number; openLeaves: number; todayAttendance: number } | null>(null);
  const [employees, setEmployees] = useState<Array<{ id: string; fullName: string; employeeCode: string; monthlySalary: number }>>([]);
  const [departments, setDepartments] = useState<Array<{ id: string; name: string; _count?: { employees: number } }>>([]);
  const [attendance, setAttendance] = useState<Array<{ id: string; employee: { fullName: string }; checkInAt: string; overtimeMins: number }>>([]);
  const [form, setForm] = useState({ fullName: '', employeeCode: '', monthlySalary: 0 });

  useEffect(() => {
    if (!token) return;
    Promise.all([getDashboard(token), listEmployees(token), listDepartments(token), listAttendance(token)]).then(([d, e, dep, att]) => {
      setDashboard(d.kpis); setEmployees(e); setDepartments(dep); setAttendance(att);
    });
  }, [token]);

  async function onCreateEmployee(): Promise<void> {
    if (!token) return;
    const created = await createEmployee(token, form);
    setEmployees((prev) => [created, ...prev]);
  }

  return (
    <div className="grid min-h-screen grid-cols-[18rem_1fr] gap-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <Sidebar />
      <main className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold">AEMS ERP Control Center</h1>
        <section className="grid grid-cols-4 gap-4">{dashboard && Object.entries(dashboard).map(([k,v]) => <article key={k} className="rounded-xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs text-slate-400">{k}</p><p className="text-2xl font-semibold">{v}</p></article>)}</section>
        <section className="grid grid-cols-2 gap-6">
          <article className="rounded-xl border border-white/10 p-4">
            <h2 className="mb-3 text-lg">Employee Management</h2>
            <div className="mb-3 grid grid-cols-3 gap-2"><input className="rounded bg-slate-800 p-2" placeholder="Name" onChange={(e)=>setForm((f)=>({...f,fullName:e.target.value}))}/><input className="rounded bg-slate-800 p-2" placeholder="Code" onChange={(e)=>setForm((f)=>({...f,employeeCode:e.target.value}))}/><input className="rounded bg-slate-800 p-2" placeholder="Salary" type="number" onChange={(e)=>setForm((f)=>({...f,monthlySalary:Number(e.target.value)}))}/></div>
            <button className="rounded bg-indigo-500 px-3 py-2" onClick={() => void onCreateEmployee()}>Create Employee</button>
            <div className="mt-4 space-y-2">{employees.map((e)=><div key={e.id} className="rounded bg-slate-900 p-2 text-sm">{e.fullName} · {e.employeeCode} · ${Number(e.monthlySalary)}</div>)}</div>
          </article>
          <article className="rounded-xl border border-white/10 p-4">
            <h2 className="mb-3 text-lg">Departments & Attendance</h2>
            <div className="space-y-2">{departments.map((d)=><div key={d.id} className="rounded bg-slate-900 p-2 text-sm">{d.name} ({d._count?.employees ?? 0})</div>)}</div>
            <h3 className="mt-4 text-md">Recent Attendance</h3>
            <div className="space-y-2">{attendance.slice(0,8).map((a)=><div key={a.id} className="rounded bg-slate-900 p-2 text-sm">{a.employee.fullName} · {new Date(a.checkInAt).toLocaleString()} · OT {a.overtimeMins}m</div>)}</div>
          </article>
        </section>
      </main>
    </div>
  );
}
