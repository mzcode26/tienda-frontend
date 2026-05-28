"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var auth_store_1 = require("../stores/auth.store");
var AuthLayout_1 = require("../layouts/AuthLayout");
var DashboardLayout_1 = require("../layouts/DashboardLayout");
var LoadingSpinner_1 = require("../components/common/LoadingSpinner");
var NotFound_1 = require("../pages/NotFound");
var POSPage_1 = require("../features/pos/pages/POSPage");
var LoginPage = (0, react_1.lazy)(function () {
    return Promise.resolve().then(function () { return require('../features/auth/pages/LoginPage'); }).then(function (m) { return ({
        default: m.LoginPage,
    }); });
});
var DashboardPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('../pages/DashboardPage'); }); });
var ProductsPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('../features/products/pages/ProductsPage'); }); });
var InventoryPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('../features/inventory/pages/InventoryPage'); }); });
var SalesPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('../features/sales/pages/SalesPage'); }); });
var CustomersPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('../features/customers/pages/CustomersPage'); }); });
var ReportsPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('../features/reports/pages/ReportsPage'); }); });
var SettingsPage = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return require('../features/settings/pages/SettingsPage'); }); });
var ProtectedRoute = function (_a) {
    var children = _a.children;
    var isAuthenticated = (0, auth_store_1.useAuthStore)(function (state) { return state.isAuthenticated; });
    if (!isAuthenticated) {
        return <react_router_dom_1.Navigate to="/login" replace/>;
    }
    return <>{children}</>;
};
var UnauthenticatedRoute = function (_a) {
    var children = _a.children;
    var isAuthenticated = (0, auth_store_1.useAuthStore)(function (state) { return state.isAuthenticated; });
    if (isAuthenticated) {
        return <react_router_dom_1.Navigate to="/dashboard" replace/>;
    }
    return <>{children}</>;
};
var router = (0, react_router_dom_1.createBrowserRouter)([
    {
        path: '/login',
        element: (<UnauthenticatedRoute>
        <AuthLayout_1.default>
          <react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <LoginPage />
          </react_1.Suspense>
        </AuthLayout_1.default>
      </UnauthenticatedRoute>),
    },
    {
        path: '/',
        element: (<ProtectedRoute>
        <DashboardLayout_1.default />
      </ProtectedRoute>),
        children: [
            {
                index: true,
                element: <react_router_dom_1.Navigate to="/dashboard" replace/>,
            },
            {
                path: 'dashboard',
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <DashboardPage />
          </react_1.Suspense>),
            },
            {
                path: 'products',
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <ProductsPage />
          </react_1.Suspense>),
            },
            {
                path: 'inventory',
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <InventoryPage />
          </react_1.Suspense>),
            },
            {
                path: 'sales',
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <SalesPage />
          </react_1.Suspense>),
            },
            {
                path: 'customers',
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <CustomersPage />
          </react_1.Suspense>),
            },
            {
                path: 'reports',
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <ReportsPage />
          </react_1.Suspense>),
            },
            {
                path: 'settings',
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
            <SettingsPage />
          </react_1.Suspense>),
            },
            {
                path: '*',
                element: <NotFound_1.default />,
            },
        ],
    },
    {
        path: '/pos',
        element: (<ProtectedRoute>
      <DashboardLayout_1.default />
    </ProtectedRoute>),
        children: [
            {
                index: true,
                element: (<react_1.Suspense fallback={<LoadingSpinner_1.default />}>
          <POSPage_1.default />
        </react_1.Suspense>),
            },
        ],
    },
]);
var AppRouter = function () { return <react_router_dom_1.RouterProvider router={router}/>; };
exports.default = AppRouter;
