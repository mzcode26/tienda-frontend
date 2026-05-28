"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogout = exports.useLogin = void 0;
var react_query_1 = require("@tanstack/react-query");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
var auth_service_1 = require("../services/auth.service");
var auth_store_1 = require("../../../stores/auth.store");
var useLogin = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var setAuth = (0, auth_store_1.useAuthStore)(function (state) { return state.setAuth; });
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var credentials = _a.credentials, tenantId = _a.tenantId;
            return auth_service_1.authService.login(credentials, tenantId);
        },
        onSuccess: function (response) {
            var accessToken = response.accessToken, refreshToken = response.refreshToken, user = response.user;
            setAuth(accessToken, refreshToken, user);
            sonner_1.toast.success("Bienvenido, ".concat(user.firstName, "!"));
            navigate('/dashboard');
        },
        onError: function () {
            sonner_1.toast.error('Email o contraseña incorrectos');
        },
    });
};
exports.useLogin = useLogin;
var useLogout = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var clearAuth = (0, auth_store_1.useAuthStore)(function (state) { return state.clearAuth; });
    return (0, react_query_1.useMutation)({
        mutationFn: auth_service_1.authService.logout,
        onSettled: function () {
            clearAuth();
            navigate('/login');
        },
    });
};
exports.useLogout = useLogout;
