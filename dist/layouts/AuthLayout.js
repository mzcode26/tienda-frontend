"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthLayout;
function AuthLayout(_a) {
    var children = _a.children;
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        {children}
      </div>
    </div>);
}
