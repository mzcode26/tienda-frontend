"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsPage;
var react_1 = require("react");
var TenantSettingsForm_1 = require("../components/TenantSettingsForm");
var StoresManager_1 = require("../components/StoresManager");
var ChangePasswordForm_1 = require("../components/ChangePasswordForm");
function SettingsPage() {
    var _a = (0, react_1.useState)('general'), activeTab = _a[0], setActiveTab = _a[1];
    return (<div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Configuración
        </h1>

        <p className="text-muted-foreground">
          Administración general del sistema
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-6">
          <button onClick={function () { return setActiveTab('general'); }} className={"pb-3 text-sm font-medium transition-colors ".concat(activeTab === 'general'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground')}>
            General
          </button>

          <button onClick={function () { return setActiveTab('stores'); }} className={"pb-3 text-sm font-medium transition-colors ".concat(activeTab === 'stores'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground')}>
            Sucursales
          </button>

          <button onClick={function () { return setActiveTab('security'); }} className={"pb-3 text-sm font-medium transition-colors ".concat(activeTab === 'security'
            ? 'border-b-2 border-primary text-primary'
            : 'text-muted-foreground hover:text-foreground')}>
            Seguridad
          </button>
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'general' && (<TenantSettingsForm_1.TenantSettingsForm />)}

        {activeTab === 'stores' && (<StoresManager_1.StoresManager />)}

        {activeTab === 'security' && (<ChangePasswordForm_1.ChangePasswordForm />)}
      </div>
    </div>);
}
