"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordForm = ChangePasswordForm;
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var settings_schema_1 = require("../schemas/settings.schema");
var useSettings_1 = require("../hooks/useSettings");
var sonner_1 = require("sonner");
function ChangePasswordForm() {
    var changePassword = (0, useSettings_1.useChangePassword)();
    var _a = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(settings_schema_1.changePasswordSchema),
    }), register = _a.register, handleSubmit = _a.handleSubmit, reset = _a.reset, errors = _a.formState.errors;
    var onSubmit = function (data) {
        changePassword.mutate(data, {
            onSuccess: function () { sonner_1.toast.success('Contraseña actualizada'); reset(); },
            onError: function () { return sonner_1.toast.error('Error al cambiar contraseña'); },
        });
    };
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual *</label>
        <input {...register('currentPassword')} type="password" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña *</label>
        <input {...register('newPassword')} type="password" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña *</label>
        <input {...register('confirmPassword')} type="password" className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>
      <div className="flex justify-end pt-2">
        <button type="submit" disabled={changePassword.isPending} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {changePassword.isPending ? 'Cambiando...' : 'Cambiar contraseña'}
        </button>
      </div>
    </form>);
}
