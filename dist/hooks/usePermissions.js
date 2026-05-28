"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePermissions = void 0;
var auth_store_1 = require("../stores/auth.store");
var usePermissions = function () {
    var roles = (0, auth_store_1.useAuthStore)(function (state) { var _a, _b; return (_b = (_a = state.user) === null || _a === void 0 ? void 0 : _a.roles) !== null && _b !== void 0 ? _b : []; });
    var hasPermission = function (permission) { return roles.includes(permission); };
    return { hasPermission: hasPermission };
};
exports.usePermissions = usePermissions;
