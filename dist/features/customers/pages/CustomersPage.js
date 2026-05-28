"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomersPage;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var useCustomers_1 = require("../hooks/useCustomers");
var CustomersTable_1 = require("../components/CustomersTable");
var CustomerForm_1 = require("../components/CustomerForm");
var CustomerDetailModal_1 = require("../components/CustomerDetailModal");
var sonner_1 = require("sonner");
function CustomersPage() {
    var _a, _b, _c, _d;
    var _e = (0, react_1.useState)({ page: 1, limit: 20 }), filters = _e[0], setFilters = _e[1];
    var _f = (0, react_1.useState)(''), search = _f[0], setSearch = _f[1];
    var _g = (0, react_1.useState)(null), selectedCustomer = _g[0], setSelectedCustomer = _g[1];
    var _h = (0, react_1.useState)(false), showForm = _h[0], setShowForm = _h[1];
    var _j = (0, react_1.useState)(false), showDetail = _j[0], setShowDetail = _j[1];
    var _k = (0, react_1.useState)(null), editingCustomer = _k[0], setEditingCustomer = _k[1];
    var _l = (0, useCustomers_1.useCustomers)(__assign(__assign({}, filters), { search: search || undefined })), data = _l.data, isLoading = _l.isLoading;
    var createCustomer = (0, useCustomers_1.useCreateCustomer)();
    var updateCustomer = (0, useCustomers_1.useUpdateCustomer)();
    var deleteCustomer = (0, useCustomers_1.useDeleteCustomer)();
    var buildCreatePayload = function (formData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var payload = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: ((_a = formData.email) === null || _a === void 0 ? void 0 : _a.trim()) || undefined,
            phone: ((_b = formData.phone) === null || _b === void 0 ? void 0 : _b.trim()) || undefined,
            address: ((_c = formData.address) === null || _c === void 0 ? void 0 : _c.trim()) || undefined,
            city: ((_d = formData.city) === null || _d === void 0 ? void 0 : _d.trim()) || undefined,
            province: ((_e = formData.province) === null || _e === void 0 ? void 0 : _e.trim()) || undefined,
            postalCode: ((_f = formData.postalCode) === null || _f === void 0 ? void 0 : _f.trim()) || undefined,
            taxId: ((_g = formData.taxId) === null || _g === void 0 ? void 0 : _g.trim()) || undefined,
            birthDate: ((_h = formData.birthDate) === null || _h === void 0 ? void 0 : _h.trim()) || undefined,
            gender: formData.gender || undefined,
            notes: ((_j = formData.notes) === null || _j === void 0 ? void 0 : _j.trim()) || undefined,
        };
        return Object.fromEntries(Object.entries(payload).filter(function (_a) {
            var value = _a[1];
            return value !== undefined && value !== '';
        }));
    };
    var buildUpdatePayload = function (formData) { return (__assign(__assign({}, buildCreatePayload(formData)), { isActive: formData.isActive })); };
    var handleSubmit = function (formData) {
        if (editingCustomer === null || editingCustomer === void 0 ? void 0 : editingCustomer.id) {
            updateCustomer.mutate({ id: editingCustomer.id, data: buildUpdatePayload(formData) }, {
                onSuccess: function () {
                    sonner_1.toast.success('Cliente actualizado');
                    setShowForm(false);
                    setEditingCustomer(null);
                },
                onError: function () { return sonner_1.toast.error('Error al actualizar'); },
            });
            return;
        }
        createCustomer.mutate(buildCreatePayload(formData), {
            onSuccess: function () {
                sonner_1.toast.success('Cliente creado');
                setShowForm(false);
            },
            onError: function () { return sonner_1.toast.error('Error al crear cliente'); },
        });
    };
    var handleEdit = function (customer) {
        setEditingCustomer(customer);
        setShowForm(true);
        setShowDetail(false);
    };
    var handleDelete = function (customer) {
        if (!confirm("\u00BFEliminar a ".concat(customer.firstName, " ").concat(customer.lastName, "?")))
            return;
        deleteCustomer.mutate(customer.id, {
            onSuccess: function () { return sonner_1.toast.success('Cliente eliminado'); },
            onError: function () { return sonner_1.toast.error('Error al eliminar'); },
        });
    };
    var handleView = function (customer) {
        setSelectedCustomer(customer);
        setShowDetail(true);
    };
    return (<div className="space-y-4 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <button onClick={function () {
            setEditingCustomer(null);
            setShowForm(true);
        }} className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
          <lucide_react_1.UserPlus className="h-4 w-4"/> Nuevo Cliente
        </button>
      </div>

      <input value={search} onChange={function (e) {
            setSearch(e.target.value);
            setFilters(function (f) { return (__assign(__assign({}, f), { page: 1 })); });
        }} placeholder="Buscar por nombre, email, teléfono o CUIT..." className="w-full max-w-md rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>

      <CustomersTable_1.CustomersTable customers={(_a = data === null || data === void 0 ? void 0 : data.items) !== null && _a !== void 0 ? _a : []} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} pagination={{
            page: (_c = (_b = data === null || data === void 0 ? void 0 : data.page) !== null && _b !== void 0 ? _b : filters.page) !== null && _c !== void 0 ? _c : 1,
            totalPages: (_d = data === null || data === void 0 ? void 0 : data.totalPages) !== null && _d !== void 0 ? _d : 1,
            onPageChange: function (page) { return setFilters(function (f) { return (__assign(__assign({}, f), { page: page })); }); },
        }}/>

      {showForm && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">{editingCustomer ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
            <CustomerForm_1.CustomerForm defaultValues={editingCustomer !== null && editingCustomer !== void 0 ? editingCustomer : undefined} onSubmit={handleSubmit} isLoading={createCustomer.isPending || updateCustomer.isPending} onCancel={function () {
                setShowForm(false);
                setEditingCustomer(null);
            }}/>
          </div>
        </div>)}

      <CustomerDetailModal_1.CustomerDetailModal customer={selectedCustomer} isOpen={showDetail} onClose={function () {
            setShowDetail(false);
            setSelectedCustomer(null);
        }} onEdit={handleEdit}/>
    </div>);
}
