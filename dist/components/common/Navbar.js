"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
var lucide_react_1 = require("lucide-react");
var auth_store_1 = require("../../stores/auth.store");
var Navbar = function (_a) {
    var onMenuClick = _a.onMenuClick, title = _a.title;
    var _b = (0, auth_store_1.useAuthStore)(), user = _b.user, clearAuth = _b.clearAuth;
    return (<nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 md:hidden">
            <lucide_react_1.Menu className="h-6 w-6"/>
          </button>
          <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative">
            <lucide_react_1.Bell className="h-5 w-5"/>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <lucide_react_1.User className="h-4 w-4 text-white"/>
              </div>
              <span className="hidden md:block text-sm font-medium">{(user === null || user === void 0 ? void 0 : user.name) || 'Usuario'}</span>
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                  <p className="font-medium text-gray-900">{user === null || user === void 0 ? void 0 : user.name}</p>
                  <p className="text-xs">{user === null || user === void 0 ? void 0 : user.email}</p>
                </div>
                <button onClick={clearAuth} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>);
};
exports.Navbar = Navbar;
