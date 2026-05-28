"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreForm = StoreForm;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var store_schema_1 = require("../schemas/store.schema");
function StoreForm(_a) {
    var initialData = _a.initialData, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, onSubmit = _a.onSubmit;
    var _c = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(store_schema_1.storeSchema),
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            email: '',
            isActive: true,
        },
    }), register = _c.register, handleSubmit = _c.handleSubmit, reset = _c.reset, errors = _c.formState.errors;
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d;
        if (initialData) {
            reset({
                name: (_a = initialData.name) !== null && _a !== void 0 ? _a : '',
                address: (_b = initialData.address) !== null && _b !== void 0 ? _b : '',
                phone: (_c = initialData.phone) !== null && _c !== void 0 ? _c : '',
                email: (_d = initialData.email) !== null && _d !== void 0 ? _d : '',
                isActive: initialData.isActive,
            });
        }
        else {
            reset({
                name: '',
                address: '',
                phone: '',
                email: '',
                isActive: true,
            });
        }
    }, [initialData, reset]);
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input type="text" {...register('name')} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500" placeholder="Sucursal Central"/>
        {errors.name && (<p className="mt-1 text-sm text-red-500">{errors.name.message}</p>)}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Dirección
        </label>
        <input type="text" {...register('address')} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500" placeholder="Av. Principal 123"/>
        {errors.address && (<p className="mt-1 text-sm text-red-500">{errors.address.message}</p>)}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input type="text" {...register('phone')} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500" placeholder="+54 381 000000"/>
        {errors.phone && (<p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>)}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input type="email" {...register('email')} className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500" placeholder="sucursal@email.com"/>
        {errors.email && (<p className="mt-1 text-sm text-red-500">{errors.email.message}</p>)}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register('isActive')} className="h-4 w-4 rounded border-gray-300"/>
        <label className="text-sm font-medium text-gray-700">
          Sucursal activa
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" disabled={isLoading} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>);
}
