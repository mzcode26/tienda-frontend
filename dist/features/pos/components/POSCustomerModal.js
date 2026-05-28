"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSCustomerModal = POSCustomerModal;
var lucide_react_1 = require("lucide-react");
var POSCustomerSelector_1 = require("../components/POSCustomerSelector");
function POSCustomerModal(_a) {
    var isOpen = _a.isOpen, selectedCustomer = _a.selectedCustomer, onClose = _a.onClose, onSelect = _a.onSelect;
    if (!isOpen)
        return null;
    var handleSelect = function (customer) {
        var _a, _b;
        onSelect(customer
            ? {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: (_a = customer.email) !== null && _a !== void 0 ? _a : undefined,
                phone: (_b = customer.phone) !== null && _b !== void 0 ? _b : undefined,
            }
            : null);
        onClose();
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Seleccionar cliente</h2>
            <p className="text-sm text-gray-500">Busca y asigna un cliente a la venta</p>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label="Cerrar">
            <lucide_react_1.X className="h-5 w-5"/>
          </button>
        </div>

        <div className="p-6">
          <POSCustomerSelector_1.CustomerSelector selectedCustomer={selectedCustomer} onSelect={handleSelect}/>
        </div>
      </div>
    </div>);
}
