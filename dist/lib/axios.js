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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var auth_store_1 = require("../stores/auth.store");
var api = axios_1.default.create({
    baseURL: (_a = import.meta.env.VITE_API_URL) !== null && _a !== void 0 ? _a : 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
var authClient = axios_1.default.create({
    baseURL: (_b = import.meta.env.VITE_API_URL) !== null && _b !== void 0 ? _b : 'http://localhost:3000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});
var isRefreshing = false;
var refreshQueue = [];
var processQueue = function (_error, token) {
    refreshQueue.forEach(function (callback) { return callback(token); });
    refreshQueue.length = 0;
};
api.interceptors.request.use(function (config) {
    var _a = auth_store_1.useAuthStore.getState(), token = _a.token, user = _a.user;
    if (config.headers) {
        if (token) {
            config.headers.Authorization = "Bearer ".concat(token);
        }
        if (user === null || user === void 0 ? void 0 : user.tenantId) {
            config.headers['x-tenant-id'] = user.tenantId;
        }
    }
    return config;
});
api.interceptors.response.use(function (response) { return response; }, function (error) { return __awaiter(void 0, void 0, void 0, function () {
    var originalRequest, status, isAuthEndpoint, refreshToken;
    var _a, _b;
    return __generator(this, function (_c) {
        originalRequest = error.config;
        status = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status;
        isAuthEndpoint = originalRequest.url === '/auth/refresh' ||
            originalRequest.url === '/auth/login';
        if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;
            refreshToken = auth_store_1.useAuthStore.getState().refreshToken;
            if (!refreshToken) {
                auth_store_1.useAuthStore.getState().clearAuth();
                window.location.assign('/login');
                return [2 /*return*/, Promise.reject(error)];
            }
            if (!isRefreshing) {
                isRefreshing = true;
                authClient
                    .post('/auth/refresh', { refreshToken: refreshToken })
                    .then(function (response) {
                    var _a = response.data.data, accessToken = _a.accessToken, newRefreshToken = _a.refreshToken;
                    var currentUser = auth_store_1.useAuthStore.getState().user;
                    var safeUser = currentUser !== null && currentUser !== void 0 ? currentUser : {
                        id: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        tenantId: '',
                        roles: [],
                        permissions: [],
                    };
                    auth_store_1.useAuthStore
                        .getState()
                        .setAuth(accessToken, newRefreshToken, safeUser);
                    processQueue(null, accessToken);
                })
                    .catch(function (refreshError) {
                    processQueue(refreshError instanceof Error
                        ? refreshError
                        : new Error('Session expired'), null);
                    auth_store_1.useAuthStore.getState().clearAuth();
                    window.location.assign('/login');
                })
                    .finally(function () {
                    isRefreshing = false;
                });
            }
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    refreshQueue.push(function (token) {
                        if (token && originalRequest.headers) {
                            originalRequest.headers.Authorization = "Bearer ".concat(token);
                            resolve(api(originalRequest));
                        }
                        else {
                            reject(error);
                        }
                    });
                })];
        }
        if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) &&
            typeof error.response.data === 'object' &&
            'message' in error.response.data) {
            return [2 /*return*/, Promise.reject(new Error(error.response.data.message))];
        }
        return [2 /*return*/, Promise.reject(error)];
    });
}); });
exports.default = api;
