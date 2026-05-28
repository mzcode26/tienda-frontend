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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsKeys = void 0;
exports.useTenantSettings = useTenantSettings;
exports.useUpdateTenantSettings = useUpdateTenantSettings;
exports.useChangePassword = useChangePassword;
exports.useStores = useStores;
exports.useStore = useStore;
exports.useCreateStore = useCreateStore;
exports.useUpdateStore = useUpdateStore;
exports.useDeleteStore = useDeleteStore;
var react_query_1 = require("@tanstack/react-query");
var settings_service_1 = require("../services/settings.service");
exports.settingsKeys = {
    all: ['settings'],
    tenant: function () { return __spreadArray(__spreadArray([], exports.settingsKeys.all, true), ['tenant'], false); },
    stores: function () { return __spreadArray(__spreadArray([], exports.settingsKeys.all, true), ['stores'], false); },
};
function useTenantSettings() {
    return (0, react_query_1.useQuery)({
        queryKey: exports.settingsKeys.tenant(),
        queryFn: function () { return settings_service_1.settingsService.getTenantSettings(); },
    });
}
function useUpdateTenantSettings() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (data) {
            return settings_service_1.settingsService.updateTenantSettings(data);
        },
        onSuccess: function (updatedSettings) {
            queryClient.setQueryData(exports.settingsKeys.tenant(), updatedSettings);
            queryClient.invalidateQueries({ queryKey: exports.settingsKeys.tenant() });
        },
    });
}
function useChangePassword() {
    return (0, react_query_1.useMutation)({
        mutationFn: function (data) { return settings_service_1.settingsService.changePassword(data); },
    });
}
function useStores() {
    return (0, react_query_1.useQuery)({
        queryKey: exports.settingsKeys.stores(),
        queryFn: function () { return settings_service_1.settingsService.getStores(); },
    });
}
/**
 * Si necesitas un store puntual, lo resolvemos desde la lista ya cargada.
 * Así evitamos depender de un método getStore que no existe en el service.
 */
function useStore(id) {
    var _a;
    var query = useStores();
    return __assign(__assign({}, query), { data: (_a = query.data) === null || _a === void 0 ? void 0 : _a.find(function (store) { return store.id === id; }) });
}
function useCreateStore() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: settings_service_1.settingsService.createStore,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: exports.settingsKeys.stores() });
        },
    });
}
function useUpdateStore() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var id = _a.id, data = _a.data;
            return settings_service_1.settingsService.updateStore(id, data);
        },
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: exports.settingsKeys.stores() });
        },
    });
}
function useDeleteStore() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: settings_service_1.settingsService.deleteStore,
        onSuccess: function () {
            queryClient.invalidateQueries({ queryKey: exports.settingsKeys.stores() });
        },
    });
}
