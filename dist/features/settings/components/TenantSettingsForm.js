"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSettingsForm = TenantSettingsForm;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var settings_schema_1 = require("../schemas/settings.schema");
var useSettings_1 = require("../hooks/useSettings");
var sonner_1 = require("sonner");
var CURRENCIES = ['ARS', 'USD', 'EUR', 'CLP', 'COP', 'MXN', 'BRL'];
var TIMEZONES = [
    'America/Argentina/Buenos_Aires',
    'America/Santiago',
    'America/Bogota',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'Europe/Madrid',
];
var DEFAULT_VALUES = {
    general: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        currency: 'ARS',
        timezone: 'America/Argentina/Buenos_Aires',
        logoUrl: '',
    },
    sales: {},
    inventory: {},
};
function TenantSettingsForm() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j = (0, useSettings_1.useTenantSettings)(), data = _j.data, isLoading = _j.isLoading;
    var updateSettings = (0, useSettings_1.useUpdateTenantSettings)();
    var _k = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(settings_schema_1.tenantSettingsSchema),
        defaultValues: DEFAULT_VALUES,
    }), register = _k.register, handleSubmit = _k.handleSubmit, reset = _k.reset, _l = _k.formState, errors = _l.errors, isDirty = _l.isDirty;
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        if (data) {
            reset({
                general: {
                    name: (_b = (_a = data.general) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
                    email: (_d = (_c = data.general) === null || _c === void 0 ? void 0 : _c.email) !== null && _d !== void 0 ? _d : '',
                    phone: (_f = (_e = data.general) === null || _e === void 0 ? void 0 : _e.phone) !== null && _f !== void 0 ? _f : '',
                    address: (_h = (_g = data.general) === null || _g === void 0 ? void 0 : _g.address) !== null && _h !== void 0 ? _h : '',
                    city: (_k = (_j = data.general) === null || _j === void 0 ? void 0 : _j.city) !== null && _k !== void 0 ? _k : '',
                    country: (_m = (_l = data.general) === null || _l === void 0 ? void 0 : _l.country) !== null && _m !== void 0 ? _m : '',
                    currency: (_p = (_o = data.general) === null || _o === void 0 ? void 0 : _o.currency) !== null && _p !== void 0 ? _p : 'ARS',
                    timezone: (_r = (_q = data.general) === null || _q === void 0 ? void 0 : _q.timezone) !== null && _r !== void 0 ? _r : 'America/Argentina/Buenos_Aires',
                    logoUrl: (_t = (_s = data.general) === null || _s === void 0 ? void 0 : _s.logoUrl) !== null && _t !== void 0 ? _t : '',
                },
                sales: (_u = data.sales) !== null && _u !== void 0 ? _u : {},
                inventory: (_v = data.inventory) !== null && _v !== void 0 ? _v : {},
            });
        }
    }, [data, reset]);
    var onSubmit = function (formData) {
        updateSettings.mutate(formData, {
            onSuccess: function () { return sonner_1.toast.success('Configuración guardada'); },
            onError: function () { return sonner_1.toast.error('Error al guardar'); },
        });
    };
    if (isLoading) {
        return <div className="h-64 bg-gray-100 rounded-xl animate-pulse"/>;
    }
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del negocio *
          </label>
          <input {...register('general.name')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {((_a = errors.general) === null || _a === void 0 ? void 0 : _a.name) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.name.message}
            </p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input {...register('general.email')} type="email" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {((_b = errors.general) === null || _b === void 0 ? void 0 : _b.email) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.email.message}
            </p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input {...register('general.phone')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {((_c = errors.general) === null || _c === void 0 ? void 0 : _c.phone) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.phone.message}
            </p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciudad
          </label>
          <input {...register('general.city')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {((_d = errors.general) === null || _d === void 0 ? void 0 : _d.city) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.city.message}
            </p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            País
          </label>
          <input {...register('general.country')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {((_e = errors.general) === null || _e === void 0 ? void 0 : _e.country) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.country.message}
            </p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dirección
          </label>
          <input {...register('general.address')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          {((_f = errors.general) === null || _f === void 0 ? void 0 : _f.address) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.address.message}
            </p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Moneda *
          </label>
          <select {...register('general.currency')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {CURRENCIES.map(function (currency) { return (<option key={currency} value={currency}>
                {currency}
              </option>); })}
          </select>
          {((_g = errors.general) === null || _g === void 0 ? void 0 : _g.currency) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.currency.message}
            </p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zona horaria *
          </label>
          <select {...register('general.timezone')} className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {TIMEZONES.map(function (timezone) { return (<option key={timezone} value={timezone}>
                {timezone}
              </option>); })}
          </select>
          {((_h = errors.general) === null || _h === void 0 ? void 0 : _h.timezone) && (<p className="text-red-500 text-xs mt-1">
              {errors.general.timezone.message}
            </p>)}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={!isDirty || updateSettings.isPending} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {updateSettings.isPending ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </form>);
}
