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
exports.CustomerForm = CustomerForm;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var customer_schema_1 = require("../schemas/customer.schema");
var toInputDate = function (value) {
    if (!value)
        return '';
    var date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return '';
    return date.toISOString().slice(0, 10);
};
var normalizeDefaults = function (defaults) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return ({
        firstName: (_a = defaults === null || defaults === void 0 ? void 0 : defaults.firstName) !== null && _a !== void 0 ? _a : '',
        lastName: (_b = defaults === null || defaults === void 0 ? void 0 : defaults.lastName) !== null && _b !== void 0 ? _b : '',
        email: (_c = defaults === null || defaults === void 0 ? void 0 : defaults.email) !== null && _c !== void 0 ? _c : '',
        phone: (_d = defaults === null || defaults === void 0 ? void 0 : defaults.phone) !== null && _d !== void 0 ? _d : '',
        address: (_e = defaults === null || defaults === void 0 ? void 0 : defaults.address) !== null && _e !== void 0 ? _e : '',
        city: (_f = defaults === null || defaults === void 0 ? void 0 : defaults.city) !== null && _f !== void 0 ? _f : '',
        province: (_g = defaults === null || defaults === void 0 ? void 0 : defaults.province) !== null && _g !== void 0 ? _g : '',
        postalCode: (_h = defaults === null || defaults === void 0 ? void 0 : defaults.postalCode) !== null && _h !== void 0 ? _h : '',
        taxId: (_j = defaults === null || defaults === void 0 ? void 0 : defaults.taxId) !== null && _j !== void 0 ? _j : '',
        birthDate: toInputDate(defaults === null || defaults === void 0 ? void 0 : defaults.birthDate),
        gender: (_k = defaults === null || defaults === void 0 ? void 0 : defaults.gender) !== null && _k !== void 0 ? _k : '',
        notes: (_l = defaults === null || defaults === void 0 ? void 0 : defaults.notes) !== null && _l !== void 0 ? _l : '',
        isActive: (_m = defaults === null || defaults === void 0 ? void 0 : defaults.isActive) !== null && _m !== void 0 ? _m : true,
    });
};
var cleanPayload = function (data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var base = __assign(__assign({}, data), { email: (_a = data.email) === null || _a === void 0 ? void 0 : _a.trim(), phone: (_b = data.phone) === null || _b === void 0 ? void 0 : _b.trim(), address: (_c = data.address) === null || _c === void 0 ? void 0 : _c.trim(), city: (_d = data.city) === null || _d === void 0 ? void 0 : _d.trim(), province: (_e = data.province) === null || _e === void 0 ? void 0 : _e.trim(), postalCode: (_f = data.postalCode) === null || _f === void 0 ? void 0 : _f.trim(), taxId: (_g = data.taxId) === null || _g === void 0 ? void 0 : _g.trim(), birthDate: (_h = data.birthDate) === null || _h === void 0 ? void 0 : _h.trim(), notes: (_j = data.notes) === null || _j === void 0 ? void 0 : _j.trim() });
    return Object.fromEntries(Object.entries(base).filter(function (_a) {
        var value = _a[1];
        return value !== '' && value !== undefined && value !== null;
    }));
};
function CustomerForm(_a) {
    var defaultValues = _a.defaultValues, onSubmit = _a.onSubmit, isLoading = _a.isLoading, onCancel = _a.onCancel;
    var normalizedDefaults = (0, react_1.useMemo)(function () { return normalizeDefaults(defaultValues); }, [defaultValues]);
    var _b = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(customer_schema_1.customerSchema),
        defaultValues: normalizedDefaults,
    }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors;
    return (<form onSubmit={handleSubmit(function (values) { return onSubmit(cleanPayload(values)); })} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input {...register('firstName')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
          <input {...register('lastName')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input {...register('email')} type="email" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input {...register('phone')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
          <input {...register('address')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
          <input {...register('city')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
          <input {...register('province')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código postal</label>
          <input {...register('postalCode')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CUIT / DNI / Identificador fiscal</label>
          <input {...register('taxId')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
          <input {...register('birthDate')} type="date" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
          <select {...register('gender')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">Sin definir</option>
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Femenino</option>
            <option value="OTHER">Otro</option>
            <option value="PREFER_NOT_TO_SAY">Prefiero no decirlo</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input {...register('isActive')} type="checkbox" className="rounded border-gray-300"/>
            Cliente activo
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
        <textarea {...register('notes')} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
          Cancelar
        </button>
        <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>);
}
