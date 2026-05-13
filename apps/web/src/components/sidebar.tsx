import { motion } from 'framer-motion';
import { useModuleStore } from '../stores/module-store';

export function Sidebar(): JSX.Element {
  const modules = useModuleStore((state) => state.modules);
  return (
    <aside className="w-72 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">Modules</h2>
      <div className="space-y-2">
        {modules.map((module) => (
          <motion.div key={module.key} whileHover={{ x: 4 }} className="rounded-lg border border-white/10 bg-slate-900/50 p-3">
            <p className="text-sm font-medium text-slate-100">{module.label}</p>
            <p className="text-xs text-slate-400">{module.defaultRoute}</p>
          </motion.div>
        ))}
      </div>
    </aside>
  );
}
