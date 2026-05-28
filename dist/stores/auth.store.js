"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthStore = void 0;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
exports.useAuthStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set) { return ({
    token: null,
    refreshToken: null,
    user: null,
    tenantId: null,
    isAuthenticated: false,
    setAuth: function (token, refreshToken, user, tenantId) {
        var _a;
        if (tenantId === void 0) { tenantId = null; }
        return set({
            token: token,
            refreshToken: refreshToken,
            user: user,
            tenantId: (_a = tenantId !== null && tenantId !== void 0 ? tenantId : user.tenantId) !== null && _a !== void 0 ? _a : null,
            isAuthenticated: true,
        });
    },
    clearAuth: function () {
        return set({
            token: null,
            refreshToken: null,
            user: null,
            tenantId: null,
            isAuthenticated: false,
        });
    },
}); }, {
    name: 'tienda-auth',
    partialize: function (state) { return ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        tenantId: state.tenantId,
        isAuthenticated: state.isAuthenticated,
    }); },
}));
