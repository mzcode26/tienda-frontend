"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
var react_router_dom_1 = require("react-router-dom");
var lucide_react_1 = require("lucide-react");
var useAuth_1 = require("../features/auth/hooks/useAuth");
var auth_store_1 = require("../stores/auth.store");
var NAV_ITEMS = [
    { to: '/dashboard', label: 'Dashboard', icon: lucide_react_1.LayoutDashboard },
    { to: '/products', label: 'Productos', icon: lucide_react_1.Package },
    { to: '/inventory', label: 'Inventario', icon: lucide_react_1.Warehouse },
    { to: '/sales', label: 'Ventas', icon: lucide_react_1.ShoppingCart },
    { to: '/pos', label: 'POS', icon: lucide_react_1.Monitor },
    { to: '/customers', label: 'Clientes', icon: lucide_react_1.Users },
    { to: '/reports', label: 'Reportes', icon: lucide_react_1.BarChart2 },
    { to: '/settings', label: 'Configuración', icon: lucide_react_1.Settings },
];
function DashboardLayout() {
    var logout = (0, useAuth_1.useLogout)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = (0, auth_store_1.useAuthStore)(function (state) { return state.user; });
    return (<div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b cursor-pointer" onClick={function () { return navigate('/dashboard'); }}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <lucide_react_1.ShoppingBag className="w-4 h-4 text-white"/>
          </div>
          <span className="font-bold text-gray-900">Tienda</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(function (_a) {
            var to = _a.to, label = _a.label, Icon = _a.icon;
            return (<react_router_dom_1.NavLink key={to} to={to} className={function (_a) {
                    var isActive = _a.isActive;
                    return "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ".concat(isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900');
                }}>
              <Icon className="w-4 h-4 shrink-0"/>
              {label}
            </react_router_dom_1.NavLink>);
        })}
        </nav>

        {/* User + Logout */}
        <div className="border-t p-3 space-y-1">
          {user && (<div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-800 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>)}
          <button onClick={function () { return logout.mutate(); }} className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <lucide_react_1.LogOut className="w-4 h-4"/>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <react_router_dom_1.Outlet />
      </main>
    </div>);
}
