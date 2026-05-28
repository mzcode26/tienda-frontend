"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresManager = StoresManager;
var react_1 = require("react");
var useSettings_1 = require("../hooks/useSettings");
var StoreForm_1 = require("./StoreForm");
function StoresManager() {
    var _a = (0, react_1.useState)(null), selectedStore = _a[0], setSelectedStore = _a[1];
    var _b = (0, react_1.useState)(false), isFormOpen = _b[0], setIsFormOpen = _b[1];
    var _c = (0, react_1.useState)(false), showInactive = _c[0], setShowInactive = _c[1];
    var _d = (0, useSettings_1.useStores)(showInactive), _e = _d.data, stores = _e === void 0 ? [] : _e, isLoading = _d.isLoading, isFetching = _d.isFetching;
    var createStore = (0, useSettings_1.useCreateStore)();
    var updateStore = (0, useSettings_1.useUpdateStore)();
    var deleteStore = (0, useSettings_1.useDeleteStore)();
    var isEditing = (0, react_1.useMemo)(function () { return Boolean(selectedStore); }, [selectedStore]);
    function handleCreate() {
        setSelectedStore(null);
        setIsFormOpen(true);
    }
    function handleEdit(store) {
        setSelectedStore(store);
        setIsFormOpen(true);
    }
    function handleDelete(store) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmed = window.confirm("\u00BFEliminar la sucursal \"".concat(store.name, "\"?"));
                        if (!confirmed)
                            return [2 /*return*/];
                        return [4 /*yield*/, deleteStore.mutateAsync(store.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleSubmit(values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!selectedStore) return [3 /*break*/, 2];
                        return [4 /*yield*/, updateStore.mutateAsync({
                                id: selectedStore.id,
                                payload: values,
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, createStore.mutateAsync(values)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        setIsFormOpen(false);
                        setSelectedStore(null);
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleCloseForm() {
        setIsFormOpen(false);
        setSelectedStore(null);
    }
    return (<div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Sucursales
          </h2>

          <p className="text-sm text-gray-500">
            Administración de tiendas y puntos de venta
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" checked={showInactive} onChange={function (e) {
            return setShowInactive(e.target.checked);
        }} className="h-4 w-4 rounded border-gray-300"/>

            Mostrar inactivas
          </label>

          <button onClick={handleCreate} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Nueva sucursal
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-3 text-sm text-gray-500">
          {isLoading || isFetching
            ? 'Cargando sucursales...'
            : "".concat(stores.length, " sucursales encontradas")}
        </div>

        {stores.length === 0 &&
            !isLoading ? (<div className="px-4 py-10 text-center text-sm text-gray-500">
            No hay sucursales registradas.
          </div>) : (<div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200 bg-white">
                {stores.map(function (store) { return (<tr key={store.id}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {store.name}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {store.address ||
                    '-'}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {store.phone ||
                    '-'}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {store.email ||
                    '-'}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <span className={"inline-flex rounded-full px-2 py-1 text-xs font-medium ".concat(store.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700')}>
                        {store.isActive
                    ? 'Activa'
                    : 'Inactiva'}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={function () {
                    return handleEdit(store);
                }} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                          Editar
                        </button>

                        <button onClick={function () {
                    return handleDelete(store);
                }} className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>); })}
              </tbody>
            </table>
          </div>)}
      </div>

      {isFormOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
            <StoreForm_1.StoreForm initialData={selectedStore !== null && selectedStore !== void 0 ? selectedStore : undefined} isLoading={createStore.isPending ||
                updateStore.isPending} onSubmit={handleSubmit}/>
          </div>
        </div>)}
    </div>);
}
