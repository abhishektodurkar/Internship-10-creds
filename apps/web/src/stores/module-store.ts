import { create } from 'zustand';
import type { ModuleManifestItem } from '../types/module';

interface ModuleState {
  modules: ModuleManifestItem[];
  setModules: (modules: ModuleManifestItem[]) => void;
}

export const useModuleStore = create<ModuleState>((set) => ({ modules: [], setModules: (modules) => set({ modules }) }));
