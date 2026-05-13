import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './app/globals.css';
import { AppShell } from './layouts/app-shell';
import { useModuleStore } from './stores/module-store';
import { getModuleManifest } from './features/core/modules/module-service';

function Bootstrap(): JSX.Element {
  const setModules = useModuleStore((state) => state.setModules);
  useEffect(() => {
    const token = import.meta.env.VITE_DEV_JWT_TOKEN;
    if (!token) return;
    getModuleManifest(token).then((data) => setModules(data.modules)).catch(() => setModules([]));
  }, [setModules]);
  return <AppShell />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Bootstrap /></React.StrictMode>);
