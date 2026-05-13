export interface ModuleDefinition { key: string; label: string; icon: string; defaultRoute: string; permissions: string[]; widgets: string[]; }
export const moduleCatalog: ModuleDefinition[] = [
  { key: 'core.analytics', label: 'Analytics', icon: 'BarChart3', defaultRoute: '/analytics', permissions: ['analytics:read'], widgets: ['kpi.revenue', 'kpi.productivity'] },
  { key: 'core.hr', label: 'HR', icon: 'Users2', defaultRoute: '/hr', permissions: ['hr:read'], widgets: ['hr.leaveBalance', 'hr.attendance'] },
  { key: 'manufacturing.production', label: 'Production', icon: 'Factory', defaultRoute: '/production', permissions: ['production:read'], widgets: ['prod.oee', 'prod.wastage'] },
  { key: 'logistics.shipments', label: 'Shipments', icon: 'Truck', defaultRoute: '/shipments', permissions: ['shipment:read'], widgets: ['ship.onTimeRate', 'ship.delays'] },
  { key: 'retail.inventory', label: 'Inventory', icon: 'Package', defaultRoute: '/inventory', permissions: ['inventory:read'], widgets: ['inv.turnover', 'inv.stockout'] }
];
