"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
var react_router_dom_1 = require("react-router-dom");
var utils_1 = require("../../lib/utils");
var lucide_react_1 = require("lucide-react");
var navigation = [
    {
        name: 'GENERAL',
        items: [
            { name: 'Dashboard', href: '/dashboard', icon: lucide_react_1.LayoutDashboard },
        ],
    },
    {
        name: 'CATÁLOGO',
        items: [
            { name: 'Productos', href: '/products', icon: lucide_react_1.Package },
        ],
    },
    {
        name: 'OPERACIONES',
        items: [
            { name: 'Inventario', href: '/inventory', icon: lucide_react_1.Package2 },
            { name: 'Ventas', href: '/sales', icon: lucide_react_1.ShoppingCart },
            { name: 'POS', href: '/pos', icon: lucide_react_1.ShoppingCart },
        ],
    },
    {
        name: 'CLIENTES',
        items: [
            { name: 'Clientes', href: '/customers', icon: lucide_react_1.Users },
        ],
    },
    {
        name: 'ADMINISTRACIÓN',
        items: [
            { name: 'Reportes', href: '/reports', icon: lucide_react_1.BarChart3 },
            { name: 'Configuración', href: '/settings', icon: lucide_react_1.Settings },
        ],
    },
];
var Sidebar = function (_a) {
    var onClose = _a.onClose;
    return (<div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <lucide_react_1.Package className="h-5 w-5 text-white"/>
          </div>
          <span className="ml-2 text-lg font-semibold text-gray-900">Tienda</span>
        </div>
        {onClose && (<button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden">
            <lucide_react_1.X className="h-5 w-5"/>
          </button>)}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 px-4 py-6">
        {navigation.map(function (section) { return (<div key={section.name}>
            <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.name}
            </h3>
            <div className="space-y-1">
              {section.items.map(function (item) { return (<react_router_dom_1.NavLink key={item.name} to={item.href} onClick={onClose} className={function (_a) {
                    var isActive = _a.isActive;
                    return (0, utils_1.cn)('group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors', isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900');
                }}>
                  <item.icon className={(0, utils_1.cn)('mr-3 h-5 w-5 flex-shrink-0', 'group-hover:text-gray-500')} aria-hidden="true"/>
                  {item.name}
                </react_router_dom_1.NavLink>); })}
            </div>
          </div>); })}
      </nav>
    </div>);
};
exports.Sidebar = Sidebar;
