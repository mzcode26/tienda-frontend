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
exports.LoginPage = LoginPage;
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var useAuth_1 = require("../hooks/useAuth");
function LoginPage() {
    var _this = this;
    var _a;
    var loginMutation = (0, useAuth_1.useLogin)();
    var _b = (0, react_hook_form_1.useForm)({
        defaultValues: {
            email: '',
            password: '',
            tenantId: (_a = localStorage.getItem('tienda-tenant-id')) !== null && _a !== void 0 ? _a : '',
        },
    }), register = _b.register, handleSubmit = _b.handleSubmit, setValue = _b.setValue, errors = _b.formState.errors;
    (0, react_1.useEffect)(function () {
        var savedTenantId = localStorage.getItem('tienda-tenant-id');
        if (savedTenantId) {
            setValue('tenantId', savedTenantId);
        }
    }, [setValue]);
    var onSubmit = function (values) { return __awaiter(_this, void 0, void 0, function () {
        var tenantId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tenantId = values.tenantId.trim();
                    localStorage.setItem('tienda-tenant-id', tenantId);
                    return [4 /*yield*/, loginMutation.mutateAsync({
                            credentials: {
                                email: values.email.trim(),
                                password: values.password,
                            },
                            tenantId: tenantId,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-gray-500">
            Accedé a tu tienda con tu empresa o sucursal
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Tenant / Empresa / Sucursal
            </label>
            <input {...register('tenantId', {
        required: 'El tenant es requerido',
    })} type="text" placeholder="mi-empresa" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"/>
            {errors.tenantId && (<p className="mt-1 text-xs text-red-600">
                {errors.tenantId.message}
              </p>)}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input {...register('email', {
        required: 'El email es requerido',
    })} type="email" placeholder="admin@correo.com" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"/>
            {errors.email && (<p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>)}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input {...register('password', {
        required: 'La contraseña es requerida',
    })} type="password" placeholder="••••••••" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"/>
            {errors.password && (<p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>)}
          </div>

          <button type="submit" disabled={loginMutation.isPending} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>);
}
